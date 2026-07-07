import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Campaign } from '../models/campaign.model';

@Injectable()
export class CampaignDao {
  constructor(
    @InjectModel(Campaign)
    private readonly campaignModel: typeof Campaign,
  ) {}

  async createCampaign(data: Partial<Campaign>): Promise<Campaign> {
    return await this.campaignModel.create(data as Campaign);
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    return await this.campaignModel.findAll();
  }

  async getCampaignById(id: number): Promise<Campaign | null> {
    return await this.campaignModel.findByPk(id);
  }

  async getCampaignsByCompanyId(companyId: number): Promise<Campaign[]> {
    return await this.campaignModel.findAll({
      where: {
        companyId,
      },
    });
  }

  async getActiveCampaigns(): Promise<Campaign[]> {
    return await this.campaignModel.findAll({
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

    return await this.getCampaignById(id);
  }

  async updateCampaignStatus(
    id: number,
    status: string,
  ): Promise<Campaign | null> {
    await this.campaignModel.update(
      { status },
      {
        where: {
          id,
        },
      },
    );

    return await this.getCampaignById(id);
  }

  async softDeleteCampaign(id: number): Promise<Campaign | null> {
    await this.campaignModel.update(
      {
        isActive: false,
      },
      {
        where: {
          id,
        },
      },
    );

    return await this.getCampaignById(id);
  }

  async deleteCampaign(id: number): Promise<number> {
    return await this.campaignModel.destroy({
      where: {
        id,
      },
    });
  }
  async campaignExists(id: number): Promise<boolean> {
    const campaign = await this.campaignModel.findByPk(id);
    return campaign !== null;
  }
  async getCampaignsByStatus(status: string): Promise<Campaign[]> {
    return await this.campaignModel.findAll({
      where: {
        status,
      },
    });
  }

  async getCampaignsByTemplateId(templateId: number): Promise<Campaign[]> {
    return await this.campaignModel.findAll({
      where: {
        templateId,
      },
    });
  }

  async getCampaignsByEmailConfigId(
    emailConfigId: number,
  ): Promise<Campaign[]> {
    return await this.campaignModel.findAll({
      where: {
        emailConfigId,
      },
    });
  }

  async countCampaignsByCompanyId(companyId: number): Promise<number> {
    return await this.campaignModel.count({
      where: {
        companyId,
      },
    });
  }
}
