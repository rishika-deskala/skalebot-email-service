import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CampaignStatus } from '../models/status.model';
import { CampaignStatusController } from '../controllers/campaignStatus.controller';
import { CampaignStatusService } from '../services/campaignStatus.service';
import { CampaignStatusDao } from '../dao/campaignStatus.dao';

@Module({
  imports: [SequelizeModule.forFeature([CampaignStatus])],
  controllers: [CampaignStatusController],
  providers: [CampaignStatusService, CampaignStatusDao],
  exports: [CampaignStatusService, CampaignStatusDao],
})
export class CampaignStatusModule {}
