import { Test, TestingModule } from '@nestjs/testing';
import { EmailConfigController } from '../../../src/controllers/emailConfig.controller';
import { EmailConfigService } from '../../../src/services/emailConfig.service';
import { UserInfoProvider } from '../../../src/shared/providers/user-info.provider';
import { EmailConfig } from '../../../src/models/emailConfig.model';

describe('EmailConfigController', () => {
  let controller: EmailConfigController;
  let service: jest.Mocked<EmailConfigService>;
  let userInfoProvider: jest.Mocked<UserInfoProvider>;

  const mockEmailConfig = {
    id: 1,
    host: 'smtp.test.com',
    port: 587,
    username: 'testuser',
    password: 'password',
    companyId: 1,
  };

  const mockEmailConfigService = {
    createConfig: jest.fn(),
    getConfigsByCompany: jest.fn(),
    getConfigById: jest.fn(),
    updateConfig: jest.fn(),
    deleteConfig: jest.fn(),
  };

  const mockUserInfoProvider = {
    getUser: jest.fn(),
    setUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailConfigController],
      providers: [
        {
          provide: EmailConfigService,
          useValue: mockEmailConfigService,
        },
        {
          provide: UserInfoProvider,
          useValue: mockUserInfoProvider,
        },
      ],
    })
      .overrideGuard(require('../../../src/shared/guards/auth.guard').AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<EmailConfigController>(EmailConfigController);
    service = module.get(EmailConfigService);
    userInfoProvider = module.get(UserInfoProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an email config', async () => {
    mockUserInfoProvider.getUser.mockReturnValue({ companyId: 1 });
    service.createConfig.mockResolvedValue(mockEmailConfig as EmailConfig);

    const createDto = { name: 'Config Name', host: 'smtp.test.com', port: 587, username: 'testuser', password: 'password', fromEmail: 'test@test.com' };
    const result = await controller.create(createDto as any);

    expect(userInfoProvider.getUser).toHaveBeenCalled();
    expect(service.createConfig).toHaveBeenCalledWith(createDto, 1);
    expect(result).toEqual(mockEmailConfig);
  });

  it('should get email configs by company', async () => {
    service.getConfigsByCompany.mockResolvedValue([mockEmailConfig as EmailConfig]);
    const result = await controller.getByCompany(1);
    expect(service.getConfigsByCompany).toHaveBeenCalledWith(1);
    expect(result).toEqual([mockEmailConfig]);
  });

  it('should get email config by id', async () => {
    service.getConfigById.mockResolvedValue(mockEmailConfig as EmailConfig);
    const result = await controller.getById(1);
    expect(service.getConfigById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockEmailConfig);
  });

  it('should update an email config', async () => {
    service.updateConfig.mockResolvedValue(mockEmailConfig as EmailConfig);
    const updateDto = { host: 'smtp.new.com' };
    const result = await controller.update(1, updateDto);
    expect(service.updateConfig).toHaveBeenCalledWith(1, updateDto);
    expect(result).toEqual(mockEmailConfig);
  });

  it('should delete an email config', async () => {
    service.deleteConfig.mockResolvedValue();
    const result = await controller.delete(1);
    expect(service.deleteConfig).toHaveBeenCalledWith(1);
    expect(result).toEqual({ success: true, message: 'Email config disabled' });
  });
});
