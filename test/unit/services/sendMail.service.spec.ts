import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { sendMailService } from '../../../src/services/sendMail.service';
import { EmailConfigDao } from '../../../src/dao/emailConfig.dao';

jest.mock('nodemailer');

describe('sendMailService', () => {
  let service: sendMailService;
  let dao: jest.Mocked<EmailConfigDao>;

  const mockEmailConfig = {
    id: 1,
    host: 'smtp.test.com',
    port: 587,
    username: 'testuser',
    password: 'password',
    fromEmail: 'from@test.com',
    isActive: true,
  };

  const mockEmailConfigDao = {
    findOne: jest.fn(),
  };

  const mockTransporter = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        sendMailService,
        {
          provide: EmailConfigDao,
          useValue: mockEmailConfigDao,
        },
      ],
    }).compile();

    service = module.get<sendMailService>(sendMailService);
    dao = module.get(EmailConfigDao);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMail', () => {
    it('should throw BadRequestException if no recipients provided', async () => {
      const dto = { recipients: [], subject: 'test', html: 'test' };
      await expect(service.sendMail(1, dto as any)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if config not found', async () => {
      dao.findOne.mockResolvedValue(null as any);
      const dto = { recipients: ['test@test.com'], subject: 'test', html: 'test' };
      await expect(service.sendMail(1, dto as any)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if config is disabled', async () => {
      dao.findOne.mockResolvedValue({ ...mockEmailConfig, isActive: false } as any);
      const dto = { recipients: ['test@test.com'], subject: 'test', html: 'test' };
      await expect(service.sendMail(1, dto as any)).rejects.toThrow(BadRequestException);
    });

    it('should send email successfully', async () => {
      dao.findOne.mockResolvedValue(mockEmailConfig as any);
      mockTransporter.sendMail.mockResolvedValue({ messageId: '123' });

      const dto = { recipients: ['test@test.com'], subject: 'Subject', html: 'HTML' };
      const result = await service.sendMail(1, dto as any);

      expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.objectContaining({
        host: 'smtp.test.com',
      }));
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(expect.objectContaining({
        from: 'from@test.com',
        to: 'test@test.com',
        subject: 'Subject',
        html: 'HTML',
      }));
      expect(result).toEqual({ messageId: '123' });
    });

    it('should throw an error if sending fails', async () => {
      dao.findOne.mockResolvedValue(mockEmailConfig as any);
      mockTransporter.sendMail.mockRejectedValue(new Error('Send failed'));

      const dto = { recipients: ['test@test.com'], subject: 'Subject', html: 'HTML' };
      await expect(service.sendMail(1, dto as any)).rejects.toThrow('Send failed');
    });
  });
});
