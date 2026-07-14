import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailConfigService } from '../../../src/services/emailConfig.service';
import { EmailConfigDao } from '../../../src/dao/emailConfig.dao';
import { EmailConfig } from '../../../src/models/emailConfig.model';

jest.mock('nodemailer');

describe('EmailConfigService', () => {
  let service: EmailConfigService;
  let dao: jest.Mocked<EmailConfigDao>;

  const mockEmailConfig = {
    id: 1,
    host: 'smtp.test.com',
    port: 587,
    username: 'testuser',
    password: 'password',
    companyId: 1,
  };

  const mockEmailConfigDao = {
    create: jest.fn(),
    findAllByCompany: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockTransporter = {
    verify: jest.fn(),
    close: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailConfigService,
        {
          provide: EmailConfigDao,
          useValue: mockEmailConfigDao,
        },
      ],
    }).compile();

    service = module.get<EmailConfigService>(EmailConfigService);
    dao = module.get(EmailConfigDao);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createConfig', () => {
    const createDto = { name: 'Config Name', host: 'smtp.test.com', port: 587, username: 'user', password: 'pwd', fromEmail: 'from@test.com' };

    it('should create an email config if SMTP verify succeeds', async () => {
      mockTransporter.verify.mockResolvedValue(true);
      dao.create.mockResolvedValue(mockEmailConfig as EmailConfig);

      const result = await service.createConfig(createDto as any, 1);

      expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.objectContaining({
        host: 'smtp.test.com',
        port: 587,
      }));
      expect(mockTransporter.verify).toHaveBeenCalled();
      expect(dao.create).toHaveBeenCalledWith({ ...createDto, companyId: 1 });
      expect(result).toEqual(mockEmailConfig);
      expect(mockTransporter.close).toHaveBeenCalled();
    });

    it('should throw BadRequestException if SMTP verify fails', async () => {
      mockTransporter.verify.mockRejectedValue(new Error('Connection timeout'));

      await expect(service.createConfig(createDto as any, 1)).rejects.toThrow(BadRequestException);
      expect(dao.create).not.toHaveBeenCalled();
      expect(mockTransporter.close).toHaveBeenCalled();
    });
  });

  it('should get configs by company', async () => {
    dao.findAllByCompany.mockResolvedValue([mockEmailConfig as EmailConfig]);
    const result = await service.getConfigsByCompany(1);
    expect(dao.findAllByCompany).toHaveBeenCalledWith(1);
    expect(result).toEqual([mockEmailConfig]);
  });

  it('should get config by id', async () => {
    dao.findOne.mockResolvedValue(mockEmailConfig as EmailConfig);
    const result = await service.getConfigById(1);
    expect(dao.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockEmailConfig);
  });

  it('should update config', async () => {
    const updateDto = { host: 'new.host.com' };
    dao.update.mockResolvedValue({ ...mockEmailConfig, ...updateDto } as EmailConfig);
    const result = await service.updateConfig(1, updateDto);
    expect(dao.update).toHaveBeenCalledWith(1, updateDto);
    expect(result.host).toBe('new.host.com');
  });

  it('should delete config', async () => {
    dao.delete.mockResolvedValue(undefined);
    await service.deleteConfig(1);
    expect(dao.delete).toHaveBeenCalledWith(1);
  });
});
