import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CampaignStatusService } from '../services/campaignStatus.service';

@ApiTags('Campaign Analytics')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('campaign-analytics')
export class CampaignStatusController {
  constructor(
    private readonly campaignStatusService: CampaignStatusService,
  ) {}

  @ApiOperation({ summary: 'Get analytics for a specific campaign' })
  @Get(':campaignId')
  async getAnalyticsByCampaignId(
    @Param('campaignId', ParseIntPipe) campaignId: number,
  ) {
    return this.campaignStatusService.getAnalyticsByCampaignId(campaignId);
  }

  @ApiOperation({ summary: 'Get aggregated analytics for all campaigns of a company' })
  @Get('company/:companyId')
  async getAnalyticsByCompanyId(
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.campaignStatusService.getAnalyticsByCompanyId(companyId);
  }

  @ApiOperation({ summary: 'Get raw per-email status rows for a campaign' })
  @Get(':campaignId/statuses')
  async getStatusesByCampaignId(
    @Param('campaignId', ParseIntPipe) campaignId: number,
  ) {
    return this.campaignStatusService.getStatusesByCampaignId(campaignId);
  }
}
