import { Injectable } from '@nestjs/common';
import {
  CampaignStatusDao,
  CampaignAnalytics,
} from '../dao/campaignStatus.dao';
import { CampaignStatus } from '../models/status.model';

@Injectable()
export class CampaignStatusService {
  constructor(private readonly campaignStatusDao: CampaignStatusDao) {}

  async getAnalyticsByCampaignId(
    campaignId: number,
  ): Promise<CampaignAnalytics> {
    return this.campaignStatusDao.getAnalyticsByCampaignId(campaignId);
  }

  async getAnalyticsByCompanyId(companyId: number): Promise<CampaignAnalytics> {
    return this.campaignStatusDao.getAnalyticsByCompanyId(companyId);
  }

  async getStatusesByCampaignId(
    campaignId: number,
  ): Promise<CampaignStatus[]> {
    return this.campaignStatusDao.getStatusesByCampaignId(campaignId);
  }

  async getStatusesByCompanyId(companyId: number): Promise<CampaignStatus[]> {
    return this.campaignStatusDao.getStatusesByCompanyId(companyId);
  }
}
