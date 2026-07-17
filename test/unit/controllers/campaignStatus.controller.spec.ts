import { Test, TestingModule } from '@nestjs/testing';
import { CampaignStatusController } from '../../../src/controllers/campaignStatus.controller';
import { CampaignStatusService } from '../../../src/services/campaignStatus.service';
import { CampaignAnalytics } from '../../../src/dao/campaignStatus.dao';
import { AuthGuard } from '../../../src/shared/guards/auth.guard';

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

const mockCampaignStatusService = {
  getAnalyticsByCampaignId: jest.fn(),
  getAnalyticsByCompanyId: jest.fn(),
  getStatusesByCampaignId: jest.fn(),
};

describe('CampaignStatusController', () => {
  let controller: CampaignStatusController;
  let service: jest.Mocked<CampaignStatusService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignStatusController],
      providers: [
        {
          provide: CampaignStatusService,
          useValue: mockCampaignStatusService,
        },
      ],
    })
      // Override AuthGuard so unit tests don't need a real auth microservice
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<CampaignStatusController>(CampaignStatusController);
    service = module.get(CampaignStatusService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAnalyticsByCampaignId', () => {
    it('should return analytics for a campaign', async () => {
      service.getAnalyticsByCampaignId.mockResolvedValue(mockAnalytics);
      const result = await controller.getAnalyticsByCampaignId(1);
      expect(service.getAnalyticsByCampaignId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockAnalytics);
    });
  });

  describe('getAnalyticsByCompanyId', () => {
    it('should return analytics aggregated for a company', async () => {
      const companyAnalytics = { ...mockAnalytics, campaignId: 0 };
      service.getAnalyticsByCompanyId.mockResolvedValue(companyAnalytics);
      const result = await controller.getAnalyticsByCompanyId(10);
      expect(service.getAnalyticsByCompanyId).toHaveBeenCalledWith(10);
      expect(result).toEqual(companyAnalytics);
    });
  });

  describe('getStatusesByCampaignId', () => {
    it('should return raw status rows for a campaign', async () => {
      const rawRows = [{ id: 1, campaignId: 1, email: 'a@b.com', status: 'sent' }];
      service.getStatusesByCampaignId.mockResolvedValue(rawRows as any);
      const result = await controller.getStatusesByCampaignId(1);
      expect(service.getStatusesByCampaignId).toHaveBeenCalledWith(1);
      expect(result).toEqual(rawRows);
    });
  });
});
