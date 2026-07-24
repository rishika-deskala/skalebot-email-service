import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Campaign } from '../models/campaign.model';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';


@Injectable()
export class CampaignDao {

  constructor(
    @InjectModel(Campaign)
    private readonly campaignModel: typeof Campaign,
  ) {}


  async createCampaign(
    createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {

    return await this.campaignModel.create(
      createCampaignDto as Campaign,
    );

  }


  async getAllCampaigns(): Promise<Campaign[]> {

    return await this.campaignModel.findAll();

  }


  async getCampaignById(
    id:number,
  ): Promise<Campaign | null> {

    return await this.campaignModel.findByPk(id);

  }


  async updateCampaign(
    id:number,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign | null> {


    await this.campaignModel.update(
      updateCampaignDto,
      {
        where:{
          id,
        },
      },
    );


    return await this.getCampaignById(id);

  }


  async deleteCampaign(
    id:number,
  ): Promise<number> {

    return await this.campaignModel.destroy({
      where:{
        id,
      },
    });

  }

}