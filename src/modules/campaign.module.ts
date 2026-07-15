import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Campaign } from '../models/campaign.model';
import { CampaignController } from '../controllers/campaign.controller';
import { CampaignService } from '../services/campaign.service';
import { CampaignDao } from '../dao/campaign.dao';

@Module({
  imports: [SequelizeModule.forFeature([Campaign])],
  controllers: [CampaignController],
  providers: [CampaignService, CampaignDao],
  exports: [CampaignService, CampaignDao],
})
export class CampaignModule {}