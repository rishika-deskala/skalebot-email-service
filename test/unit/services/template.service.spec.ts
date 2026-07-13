import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { TemplateService } from '../../../src/services/template.service';
import { TemplateDao } from '../../../src/dao/template.dao';

describe('TemplateService', () => {
  let service: TemplateService;
  let templateDao: jest.Mocked<TemplateDao>;

  const mockUser = { id: 1, userId: 1, companyId: 10 };

  const mockTemplate: any = {
    id: 1,
    name: 'Welcome Template',
    subject: 'Hello {{userName}}',
    body: 'Hi {{userName}}',
    variables: { userName: 'John Doe' },
    companyId: 10,
    emailConfigId: 1,
    isActive: true,
  };

  const mockTemplateDao = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAndCountAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateService,
        {
          provide: TemplateDao,
          useValue: mockTemplateDao,
        },
      ],
    }).compile();

    service = module.get<TemplateService>(TemplateService);
    templateDao = module.get(TemplateDao);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto = {
      name: 'Welcome',
      subject: 'Hello {{userName}}',
      body: 'Hi {{userName}}',
      variables: { userName: 'Test' },
      companyId: 10,
      emailConfigId: 1,
    };

    it('should create a template successfully', async () => {
      mockTemplateDao.findAll.mockResolvedValue([]);
      mockTemplateDao.create.mockResolvedValue(mockTemplate);

      const result = await service.create(createDto, mockUser);
      expect(templateDao.create).toHaveBeenCalled();
      expect(result).toEqual(mockTemplate);
    });

    it('should throw ConflictException when name exists', async () => {
      mockTemplateDao.findAll.mockResolvedValue([mockTemplate]);
      await expect(service.create(createDto, mockUser)).rejects.toThrow(ConflictException);
    });

    it('should throw BadRequestException when subject has missing variables', async () => {
      mockTemplateDao.findAll.mockResolvedValue([]);
      const badDto = { ...createDto, subject: 'Hello {{missing}}' };
      await expect(service.create(badDto, mockUser)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return paginated templates', async () => {
      mockTemplateDao.findAndCountAll.mockResolvedValue({ count: 1, rows: [mockTemplate] });
      const result = await service.findAll(10, { limit: 10, offset: 0 });
      expect(result.count).toBe(1);
    });
  });

  describe('findById', () => {
    it('should return template', async () => {
      mockTemplateDao.findById.mockResolvedValue(mockTemplate);
      const result = await service.findById(1, 10);
      expect(result).toEqual(mockTemplate);
    });

    it('should throw NotFoundException if companyId mismatch', async () => {
      mockTemplateDao.findById.mockResolvedValue({ ...mockTemplate, companyId: 99 });
      await expect(service.findById(1, 10)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateDto = { name: 'Updated Name' };

    it('should update template', async () => {
      mockTemplateDao.findById.mockResolvedValue(mockTemplate);
      mockTemplateDao.findAll.mockResolvedValue([]);
      mockTemplateDao.update.mockResolvedValue({ ...mockTemplate, name: 'Updated Name' });

      const result = await service.update(1, updateDto, mockUser);
      expect(templateDao.update).toHaveBeenCalled();
      expect(result.name).toBe('Updated Name');
    });
  });

  describe('delete', () => {
    it('should soft-delete template', async () => {
      mockTemplateDao.findById.mockResolvedValue(mockTemplate);
      mockTemplateDao.delete.mockResolvedValue(undefined);

      await service.delete(1, 10);
      expect(templateDao.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('send', () => {
    it('should queue emails', async () => {
      mockTemplateDao.findById.mockResolvedValue(mockTemplate);

      const sendDto = {
        recipients: [{ email: 'alice@example.com', variables: { userName: 'Alice' } }],
        emailConfigId: 1,
      };

      const result = await service.send(1, 10, sendDto);
      expect(result.total).toBe(1);
      expect(result.results[0].status).toBe('queued');
    });
  });
});
