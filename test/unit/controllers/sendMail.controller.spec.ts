import { Test, TestingModule } from '@nestjs/testing';
import { sendMailController } from '../../../src/controllers/sendMail.controller';
import { sendMailService } from '../../../src/services/sendMail.service';

describe('sendMailController', () => {
  let controller: sendMailController;
  let service: jest.Mocked<sendMailService>;

  const mockSendMailService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [sendMailController],
      providers: [
        {
          provide: sendMailService,
          useValue: mockSendMailService,
        },
      ],
    })
      .overrideGuard(require('../../../src/shared/guards/auth.guard').AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<sendMailController>(sendMailController);
    service = module.get(sendMailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should send mail and return success', async () => {
    service.sendMail.mockResolvedValue({ messageId: '12345' });

    const dto = { recipients: ['test@test.com'], subject: 'Test', html: '<p>Test</p>' };
    const result = await controller.sendMail(1, dto as any);

    expect(service.sendMail).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ success: true, messageId: '12345' });
  });
});
