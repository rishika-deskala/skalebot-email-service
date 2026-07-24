import { Injectable } from '@nestjs/common';

import { CampaignDao } from '../dao/campaign.dao';
import { Campaign } from '../models/campaign.model';

import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';

import { sendMailService } from './sendMail.service';
import { SendMailDto } from '../dto/sendMail.dto';


@Injectable()
export class CampaignService {

  constructor(
    private readonly campaignDao: CampaignDao,
    private readonly sendMailService: sendMailService,
  ) {}


  async createCampaign(
    createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {


    const campaign =
      await this.campaignDao.createCampaign(
        createCampaignDto,
      );


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



  async getCampaignById(
    id:number,
  ): Promise<Campaign | null> {

    return this.campaignDao.getCampaignById(id);

  }



  async updateCampaign(
    id:number,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign | null> {

    return this.campaignDao.updateCampaign(
      id,
      updateCampaignDto,
    );

  }



  async deleteCampaign(
    id:number,
  ): Promise<number> {

    return this.campaignDao.deleteCampaign(id);

  }

}