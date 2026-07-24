import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Campaign } from '../models/campaign.model';
import { CampaignController } from '../controllers/campaign.controller';
import { CampaignService } from '../services/campaign.service';
import { CampaignDao } from '../dao/campaign.dao';
import { sendMailModule } from './sendMail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Campaign]),
    sendMailModule,
  ],
  controllers: [CampaignController],
  providers: [CampaignService, CampaignDao],
  exports: [CampaignService, CampaignDao],
})
export class CampaignModule {}