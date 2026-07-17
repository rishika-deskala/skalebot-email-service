import { Test, TestingModule } from '@nestjs/testing';
import { CampaignStatusService } from '../../../src/services/campaignStatus.service';
import { CampaignStatusDao, CampaignAnalytics } from '../../../src/dao/campaignStatus.dao';
import { CampaignStatus } from '../../../src/models/status.model';

const mockAnalytics: CampaignAnalytics = {
  campaignId: 1,
  totalSent: 100,
  totalOpened: 40,
  totalClicked: 15,
  totalNotReached: 5,
  totalNotOpened: 60,
  openRate: '40.00%',
  clickRate: '15.00%',
  bounceRate: '4.76%',
};

const mockCampaignStatusDao = {
  getAnalyticsByCampaignId: jest.fn(),
  getAnalyticsByCompanyId: jest.fn(),
  getStatusesByCampaignId: jest.fn(),
  getStatusesByCompanyId: jest.fn(),
};

describe('CampaignStatusService', () => {
  let service: CampaignStatusService;
  let dao: jest.Mocked<CampaignStatusDao>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignStatusService,
        {
          provide: CampaignStatusDao,
          useValue: mockCampaignStatusDao,
        },
      ],
    }).compile();

    service = module.get<CampaignStatusService>(CampaignStatusService);
    dao = module.get(CampaignStatusDao);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAnalyticsByCampaignId', () => {
    it('should delegate to dao and return analytics', async () => {
      dao.getAnalyticsByCampaignId.mockResolvedValue(mockAnalytics);
      const result = await service.getAnalyticsByCampaignId(1);
      expect(dao.getAnalyticsByCampaignId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockAnalytics);
    });
  });

  describe('getAnalyticsByCompanyId', () => {
    it('should delegate to dao and return company-level analytics', async () => {
      const companyAnalytics = { ...mockAnalytics, campaignId: 0 };
      dao.getAnalyticsByCompanyId.mockResolvedValue(companyAnalytics);
      const result = await service.getAnalyticsByCompanyId(10);
      expect(dao.getAnalyticsByCompanyId).toHaveBeenCalledWith(10);
      expect(result).toEqual(companyAnalytics);
    });
  });

  describe('getStatusesByCampaignId', () => {
    it('should return raw campaign status rows', async () => {
      const rows = [{ id: 1, campaignId: 1, email: 'a@b.com', status: 'sent' }] as CampaignStatus[];
      dao.getStatusesByCampaignId.mockResolvedValue(rows);
      const result = await service.getStatusesByCampaignId(1);
      expect(dao.getStatusesByCampaignId).toHaveBeenCalledWith(1);
      expect(result).toEqual(rows);
    });
  });

  describe('getStatusesByCompanyId', () => {
    it('should return raw company status rows', async () => {
      const rows = [{ id: 1, companyId: 2, email: 'x@y.com', status: 'opened' }] as CampaignStatus[];
      dao.getStatusesByCompanyId.mockResolvedValue(rows);
      const result = await service.getStatusesByCompanyId(2);
      expect(dao.getStatusesByCompanyId).toHaveBeenCalledWith(2);
      expect(result).toEqual(rows);
    });
  });
});
