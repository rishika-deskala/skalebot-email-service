import { Test, TestingModule } from '@nestjs/testing';
import { CampaignController } from '../../../src/controllers/campaign.controller';
import { CampaignService } from '../../../src/services/campaign.service';
import { Campaign } from '../../../src/models/campaign.model';

describe('CampaignController', () => {
  let controller: CampaignController;
  let service: jest.Mocked<CampaignService>;

  const mockCampaign: Partial<Campaign> = {
    id: 1,
    name: 'Test Campaign',
    status: 'draft',
    companyId: 1,
    templateId: 1,
    emailConfigId: 1,
  };

  const mockCampaignService = {
    createCampaign: jest.fn(),
    getAllCampaigns: jest.fn(),
    getCampaignById: jest.fn(),
    getCampaignsByCompanyId: jest.fn(),
    getActiveCampaigns: jest.fn(),
    updateCampaign: jest.fn(),
    updateCampaignStatus: jest.fn(),
    softDeleteCampaign: jest.fn(),
    deleteCampaign: jest.fn(),
    campaignExists: jest.fn(),
    getCampaignsByStatus: jest.fn(),
    getCampaignsByTemplateId: jest.fn(),
    getCampaignsByEmailConfigId: jest.fn(),
    countCampaignsByCompanyId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [
        {
          provide: CampaignService,
          useValue: mockCampaignService,
        },
      ],
    }).compile();

    controller = module.get<CampaignController>(CampaignController);
    service = module.get(CampaignService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a campaign', async () => {
    service.createCampaign.mockResolvedValue(mockCampaign as Campaign);
    const result = await controller.createCampaign(mockCampaign);
    expect(service.createCampaign).toHaveBeenCalledWith(mockCampaign);
    expect(result).toEqual(mockCampaign);
  });

  it('should get all campaigns', async () => {
    service.getAllCampaigns.mockResolvedValue([mockCampaign as Campaign]);
    const result = await controller.getAllCampaigns();
    expect(service.getAllCampaigns).toHaveBeenCalled();
    expect(result).toEqual([mockCampaign]);
  });

  it('should get campaign by id', async () => {
    service.getCampaignById.mockResolvedValue(mockCampaign as Campaign);
    const result = await controller.getCampaignById(1);
    expect(service.getCampaignById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCampaign);
  });

  it('should get campaigns by company id', async () => {
    service.getCampaignsByCompanyId.mockResolvedValue([mockCampaign as Campaign]);
    const result = await controller.getCampaignsByCompanyId(1);
    expect(service.getCampaignsByCompanyId).toHaveBeenCalledWith(1);
    expect(result).toEqual([mockCampaign]);
  });

  it('should get active campaigns', async () => {
    service.getActiveCampaigns.mockResolvedValue([mockCampaign as Campaign]);
    const result = await controller.getActiveCampaigns();
    expect(service.getActiveCampaigns).toHaveBeenCalled();
    expect(result).toEqual([mockCampaign]);
  });

  it('should update campaign', async () => {
    service.updateCampaign.mockResolvedValue(mockCampaign as Campaign);
    const result = await controller.updateCampaign(1, mockCampaign);
    expect(service.updateCampaign).toHaveBeenCalledWith(1, mockCampaign);
    expect(result).toEqual(mockCampaign);
  });

  it('should update campaign status', async () => {
    service.updateCampaignStatus.mockResolvedValue(mockCampaign as Campaign);
    const result = await controller.updateCampaignStatus(1, 'active');
    expect(service.updateCampaignStatus).toHaveBeenCalledWith(1, 'active');
    expect(result).toEqual(mockCampaign);
  });

  it('should soft delete campaign', async () => {
    service.softDeleteCampaign.mockResolvedValue(mockCampaign as Campaign);
    const result = await controller.softDeleteCampaign(1);
    expect(service.softDeleteCampaign).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCampaign);
  });

  it('should delete campaign', async () => {
    service.deleteCampaign.mockResolvedValue(1);
    const result = await controller.deleteCampaign(1);
    expect(service.deleteCampaign).toHaveBeenCalledWith(1);
    expect(result).toEqual(1);
  });

  it('should check if campaign exists', async () => {
    service.campaignExists.mockResolvedValue(true);
    const result = await controller.campaignExists(1);
    expect(service.campaignExists).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });

  it('should get campaigns by status', async () => {
    service.getCampaignsByStatus.mockResolvedValue([mockCampaign as Campaign]);
    const result = await controller.getCampaignsByStatus('draft');
    expect(service.getCampaignsByStatus).toHaveBeenCalledWith('draft');
    expect(result).toEqual([mockCampaign]);
  });

  it('should get campaigns by template id', async () => {
    service.getCampaignsByTemplateId.mockResolvedValue([mockCampaign as Campaign]);
    const result = await controller.getCampaignsByTemplateId(1);
    expect(service.getCampaignsByTemplateId).toHaveBeenCalledWith(1);
    expect(result).toEqual([mockCampaign]);
  });

  it('should get campaigns by email config id', async () => {
    service.getCampaignsByEmailConfigId.mockResolvedValue([mockCampaign as Campaign]);
    const result = await controller.getCampaignsByEmailConfigId(1);
    expect(service.getCampaignsByEmailConfigId).toHaveBeenCalledWith(1);
    expect(result).toEqual([mockCampaign]);
  });

  it('should count campaigns by company id', async () => {
    service.countCampaignsByCompanyId.mockResolvedValue(5);
    const result = await controller.countCampaignsByCompanyId(1);
    expect(service.countCampaignsByCompanyId).toHaveBeenCalledWith(1);
    expect(result).toEqual(5);
  });
});
