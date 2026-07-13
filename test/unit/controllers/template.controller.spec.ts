import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { TemplateController } from '../../../src/controllers/template.controller';
import { TemplateService } from '../../../src/services/template.service';
import { UserInfoProvider } from '../../../src/shared/providers/user-info.provider';
import { CreateTemplateDto } from '../../../src/dto/create-template.dto';
import { UpdateTemplateDto } from '../../../src/dto/update-template.dto';
import { SendTemplateDto } from '../../../src/dto/send-template.dto';

describe('TemplateController', () => {
  let controller: TemplateController;
  let templateService: jest.Mocked<TemplateService>;
  let userInfoProvider: jest.Mocked<UserInfoProvider>;

  const mockUser = { id: 1, userId: 1, companyId: 10 };

  const mockTemplate = {
    id: 1,
    name: 'Welcome Template',
    subject: 'Hello {{userName}}, welcome!',
    body: 'Hi {{userName}}, thanks for joining.',
    variables: { userName: 'John Doe' },
    companyId: 10,
    emailConfigId: 1,
    isActive: true,
  };

  const mockTemplateService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    send: jest.fn(),
  };

  const mockUserInfoProvider = {
    getUser: jest.fn(),
    setUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateController],
      providers: [
        {
          provide: TemplateService,
          useValue: mockTemplateService,
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

    controller = module.get<TemplateController>(TemplateController);
    templateService = module.get(TemplateService);
    userInfoProvider = module.get(UserInfoProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a template', async () => {
      const dto: CreateTemplateDto = { name: 'Welcome', subject: 'Hi', body: 'Test', companyId: 10, emailConfigId: 1 };
      mockUserInfoProvider.getUser.mockReturnValue(mockUser);
      mockTemplateService.create.mockResolvedValue(mockTemplate as any);

      const result = await controller.create(dto);
      expect(templateService.create).toHaveBeenCalledWith(dto, mockUser);
      expect(result).toEqual(mockTemplate);
    });
  });

  describe('findAll', () => {
    it('should return paginated templates', async () => {
      mockUserInfoProvider.getUser.mockReturnValue(mockUser);
      mockTemplateService.findAll.mockResolvedValue({ count: 1, rows: [mockTemplate as any] });

      const result = await controller.findAll(10, 0, undefined);
      expect(templateService.findAll).toHaveBeenCalledWith(10, { limit: 10, offset: 0, search: undefined });
      expect(result.rows).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('should return a template', async () => {
      mockUserInfoProvider.getUser.mockReturnValue(mockUser);
      mockTemplateService.findById.mockResolvedValue(mockTemplate as any);

      const result = await controller.findOne(1);
      expect(templateService.findById).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual(mockTemplate);
    });
  });

  describe('update', () => {
    it('should update a template', async () => {
      const dto: UpdateTemplateDto = { name: 'Updated' };
      mockUserInfoProvider.getUser.mockReturnValue(mockUser);
      mockTemplateService.update.mockResolvedValue({ ...mockTemplate, name: 'Updated' } as any);

      const result = await controller.update(1, dto);
      expect(templateService.update).toHaveBeenCalledWith(1, dto, mockUser);
      expect(result.name).toBe('Updated');
    });
  });

  describe('remove', () => {
    it('should delete a template', async () => {
      mockUserInfoProvider.getUser.mockReturnValue(mockUser);
      mockTemplateService.delete.mockResolvedValue(undefined);

      const result = await controller.remove(1);
      expect(templateService.delete).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual({ success: true, message: 'Template with ID 1 soft-deleted.' });
    });
  });

  describe('send', () => {
    it('should send templates', async () => {
      const dto: SendTemplateDto = { recipients: [{ email: 'test@example.com' }], emailConfigId: 1 };
      mockUserInfoProvider.getUser.mockReturnValue(mockUser);
      mockTemplateService.send.mockResolvedValue({ total: 1, results: [{ email: 'test@example.com', status: 'queued' }] });

      const result = await controller.send(1, dto);
      expect(templateService.send).toHaveBeenCalledWith(1, 10, dto);
      expect(result.total).toBe(1);
    });
  });
});
