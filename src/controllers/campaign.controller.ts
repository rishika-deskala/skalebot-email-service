import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CampaignService } from '../services/campaign.service';
import { Campaign } from '../models/campaign.model';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  async createCampaign(@Body() data: Partial<Campaign>) {
    return this.campaignService.createCampaign(data);
  }

  @Get()
  async getAllCampaigns() {
    return this.campaignService.getAllCampaigns();
  }

  @Get(':id')
  async getCampaignById(@Param('id') id: number) {
    return this.campaignService.getCampaignById(Number(id));
  }

  @Get('company/:companyId')
  async getCampaignsByCompanyId(@Param('companyId') companyId: number) {
    return this.campaignService.getCampaignsByCompanyId(Number(companyId));
  }

  @Get('active/all')
  async getActiveCampaigns() {
    return this.campaignService.getActiveCampaigns();
  }

  @Put(':id')
  async updateCampaign(
    @Param('id') id: number,
    @Body() data: Partial<Campaign>,
  ) {
    return this.campaignService.updateCampaign(Number(id), data);
  }

  @Patch(':id/status')
  async updateCampaignStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ) {
    return this.campaignService.updateCampaignStatus(Number(id), status);
  }

  @Patch(':id/soft-delete')
  async softDeleteCampaign(@Param('id') id: number) {
    return this.campaignService.softDeleteCampaign(Number(id));
  }

  @Delete(':id')
  async deleteCampaign(@Param('id') id: number) {
    return this.campaignService.deleteCampaign(Number(id));
  }

  @Get('exists/:id')
  async campaignExists(@Param('id') id: number) {
    return this.campaignService.campaignExists(Number(id));
  }

  @Get('status/:status')
  async getCampaignsByStatus(@Param('status') status: string) {
    return this.campaignService.getCampaignsByStatus(status);
  }

  @Get('template/:templateId')
  async getCampaignsByTemplateId(@Param('templateId') templateId: number) {
    return this.campaignService.getCampaignsByTemplateId(Number(templateId));
  }

  @Get('email-config/:emailConfigId')
  async getCampaignsByEmailConfigId(
    @Param('emailConfigId') emailConfigId: number,
  ) {
    return this.campaignService.getCampaignsByEmailConfigId(
      Number(emailConfigId),
    );
  }

  @Get('count/company/:companyId')
  async countCampaignsByCompanyId(@Param('companyId') companyId: number) {
    return this.campaignService.countCampaignsByCompanyId(Number(companyId));
  }
}
