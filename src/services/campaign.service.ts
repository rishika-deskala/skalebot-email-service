import { Injectable } from '@nestjs/common';
import { CampaignDao } from '../dao/campaign.dao';
import { Campaign } from '../models/campaign.model';

@Injectable()
export class CampaignService {
  constructor(private readonly campaignDao: CampaignDao) {}

  async createCampaign(data: Partial<Campaign>): Promise<Campaign> {
    return this.campaignDao.createCampaign(data);
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    return this.campaignDao.getAllCampaigns();
  }

  async getCampaignById(id: number): Promise<Campaign | null> {
    return this.campaignDao.getCampaignById(id);
  }

  async getCampaignsByCompanyId(companyId: number): Promise<Campaign[]> {
    return this.campaignDao.getCampaignsByCompanyId(companyId);
  }

  async getActiveCampaigns(): Promise<Campaign[]> {
    return this.campaignDao.getActiveCampaigns();
  }

  async updateCampaign(
    id: number,
    data: Partial<Campaign>,
  ): Promise<Campaign | null> {
    return this.campaignDao.updateCampaign(id, data);
  }

  async updateCampaignStatus(
    id: number,
    status: string,
  ): Promise<Campaign | null> {
    return this.campaignDao.updateCampaignStatus(id, status);
  }

  async softDeleteCampaign(id: number): Promise<Campaign | null> {
    return this.campaignDao.softDeleteCampaign(id);
  }

  async deleteCampaign(id: number): Promise<number> {
    return this.campaignDao.deleteCampaign(id);
  }

  async campaignExists(id: number): Promise<boolean> {
    return this.campaignDao.campaignExists(id);
  }

  async getCampaignsByStatus(status: string): Promise<Campaign[]> {
    return this.campaignDao.getCampaignsByStatus(status);
  }

  async getCampaignsByTemplateId(templateId: number): Promise<Campaign[]> {
    return this.campaignDao.getCampaignsByTemplateId(templateId);
  }

  async getCampaignsByEmailConfigId(
    emailConfigId: number,
  ): Promise<Campaign[]> {
    return this.campaignDao.getCampaignsByEmailConfigId(emailConfigId);
  }

  async countCampaignsByCompanyId(companyId: number): Promise<number> {
    return this.campaignDao.countCampaignsByCompanyId(companyId);
  }
}
