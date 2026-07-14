import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Campaign } from '../models/campaign.model';
import { CampaignDao } from '../dao/campaign.dao';
import { CampaignService } from '../services/campaign.service';
import { CampaignController } from '../controllers/campaign.controller';

@Module({
  imports: [SequelizeModule.forFeature([Campaign])],
  controllers: [CampaignController],
  providers: [CampaignService, CampaignDao],
  exports: [CampaignDao, CampaignService],
})
export class CampaignModule {}
