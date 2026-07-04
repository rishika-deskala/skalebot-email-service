import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Campaign } from '../models/campaign.model';

@Injectable()
export class CampaignDao {
  constructor(
    @InjectModel(Campaign)
    private readonly campaignModel: typeof Campaign,
  ) {}

  async createCampaign(data: Partial<Campaign>) {
    return this.campaignModel.create(data as Campaign);
  }

  async getAllCampaigns() {
    return this.campaignModel.findAll();
  }

  async getCampaignById(id: number) {
    return this.campaignModel.findByPk(id);
  }

  async getCampaignsByCompanyId(companyId: number): Promise<Campaign[]> {
    return this.campaignModel.findAll({
      where: {
        companyId,
      },
    });
  }

  async getActiveCampaigns(): Promise<Campaign[]> {
    return this.campaignModel.findAll({
      where: {
        isActive: true,
      },
    });
  }
  async updateCampaign(
    id: number,
    data: Partial<Campaign>,
  ): Promise<Campaign | null> {
    await this.campaignModel.update(data, {
      where: {
        id,
      },
    });

    return this.getCampaignById(id);
  }
  async updateCampaignStatus(
    id: number,
    status: string,
  ): Promise<Campaign | null> {
    await this.campaignModel.update(
      { status },
      {
        where: { id },
      },
    );

    return this.getCampaignById(id);
  }

  async softDeleteCampaign(id: number): Promise<Campaign | null> {
    await this.campaignModel.update(
      {
        isActive: false,
      },
      {
        where: { id },
      },
    );

    return this.getCampaignById(id);
  }
}
