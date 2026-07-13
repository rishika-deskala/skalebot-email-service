import { Test, TestingModule } from '@nestjs/testing';
import { CampaignService } from '../../../src/services/campaign.service';
import { CampaignDao } from '../../../src/dao/campaign.dao';
import { Campaign } from '../../../src/models/campaign.model';

describe('CampaignService', () => {
  let service: CampaignService;
  let dao: jest.Mocked<CampaignDao>;

  const mockCampaign: Partial<Campaign> = {
    id: 1,
    name: 'Test Campaign',
    status: 'draft',
    companyId: 1,
  };

  const mockCampaignDao = {
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
      providers: [
        CampaignService,
        {
          provide: CampaignDao,
          useValue: mockCampaignDao,
        },
      ],
    }).compile();

    service = module.get<CampaignService>(CampaignService);
    dao = module.get(CampaignDao);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create campaign', async () => {
    dao.createCampaign.mockResolvedValue(mockCampaign as Campaign);
    const result = await service.createCampaign(mockCampaign);
    expect(dao.createCampaign).toHaveBeenCalledWith(mockCampaign);
    expect(result).toEqual(mockCampaign);
  });

  it('should get all campaigns', async () => {
    dao.getAllCampaigns.mockResolvedValue([mockCampaign as Campaign]);
    const result = await service.getAllCampaigns();
    expect(dao.getAllCampaigns).toHaveBeenCalled();
    expect(result).toEqual([mockCampaign]);
  });

  it('should get campaign by id', async () => {
    dao.getCampaignById.mockResolvedValue(mockCampaign as Campaign);
    const result = await service.getCampaignById(1);
    expect(dao.getCampaignById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCampaign);
  });

  it('should get campaigns by company id', async () => {
    dao.getCampaignsByCompanyId.mockResolvedValue([mockCampaign as Campaign]);
    const result = await service.getCampaignsByCompanyId(1);
    expect(dao.getCampaignsByCompanyId).toHaveBeenCalledWith(1);
    expect(result).toEqual([mockCampaign]);
  });

  it('should get active campaigns', async () => {
    dao.getActiveCampaigns.mockResolvedValue([mockCampaign as Campaign]);
    const result = await service.getActiveCampaigns();
    expect(dao.getActiveCampaigns).toHaveBeenCalled();
    expect(result).toEqual([mockCampaign]);
  });

  it('should update campaign', async () => {
    dao.updateCampaign.mockResolvedValue(mockCampaign as Campaign);
    const result = await service.updateCampaign(1, mockCampaign);
    expect(dao.updateCampaign).toHaveBeenCalledWith(1, mockCampaign);
    expect(result).toEqual(mockCampaign);
  });

  it('should update campaign status', async () => {
    dao.updateCampaignStatus.mockResolvedValue(mockCampaign as Campaign);
    const result = await service.updateCampaignStatus(1, 'active');
    expect(dao.updateCampaignStatus).toHaveBeenCalledWith(1, 'active');
    expect(result).toEqual(mockCampaign);
  });

  it('should soft delete campaign', async () => {
    dao.softDeleteCampaign.mockResolvedValue(mockCampaign as Campaign);
    const result = await service.softDeleteCampaign(1);
    expect(dao.softDeleteCampaign).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCampaign);
  });

  it('should delete campaign', async () => {
    dao.deleteCampaign.mockResolvedValue(1);
    const result = await service.deleteCampaign(1);
    expect(dao.deleteCampaign).toHaveBeenCalledWith(1);
    expect(result).toEqual(1);
  });

  it('should check if campaign exists', async () => {
    dao.campaignExists.mockResolvedValue(true);
    const result = await service.campaignExists(1);
    expect(dao.campaignExists).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });

  it('should get campaigns by status', async () => {
    dao.getCampaignsByStatus.mockResolvedValue([mockCampaign as Campaign]);
    const result = await service.getCampaignsByStatus('draft');
    expect(dao.getCampaignsByStatus).toHaveBeenCalledWith('draft');
    expect(result).toEqual([mockCampaign]);
  });

  it('should get campaigns by template id', async () => {
    dao.getCampaignsByTemplateId.mockResolvedValue([mockCampaign as Campaign]);
    const result = await service.getCampaignsByTemplateId(1);
    expect(dao.getCampaignsByTemplateId).toHaveBeenCalledWith(1);
    expect(result).toEqual([mockCampaign]);
  });

  it('should get campaigns by email config id', async () => {
    dao.getCampaignsByEmailConfigId.mockResolvedValue([mockCampaign as Campaign]);
    const result = await service.getCampaignsByEmailConfigId(1);
    expect(dao.getCampaignsByEmailConfigId).toHaveBeenCalledWith(1);
    expect(result).toEqual([mockCampaign]);
  });

  it('should count campaigns by company id', async () => {
    dao.countCampaignsByCompanyId.mockResolvedValue(5);
    const result = await service.countCampaignsByCompanyId(1);
    expect(dao.countCampaignsByCompanyId).toHaveBeenCalledWith(1);
    expect(result).toEqual(5);
  });
});
