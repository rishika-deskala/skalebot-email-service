import { Injectable } from '@nestjs/common';
import { CampaignDao } from '../dao/campaign.dao';
import { Campaign } from '../models/campaign.model';
import { sendMailService } from './sendMail.service';
import { SendMailDto } from '../dto/sendMail.dto';

@Injectable()
export class CampaignService {
  constructor(
    private readonly campaignDao: CampaignDao,
    private readonly sendMailService: sendMailService,
  ) {}

 async createCampaign(data: Partial<Campaign>): Promise<Campaign> {
 
  const campaign = await this.campaignDao.createCampaign(data);


  const mailDto: SendMailDto = {
    recipients: [
      'test1@gmail.com',
      'test2@gmail.com',
    ],
    subject: campaign.subject,
    html: campaign.body,
    text: campaign.body,
  };

 
  await this.sendMailService.sendMail(
    campaign.emailConfigId,
    mailDto,
  );

  return campaign;
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