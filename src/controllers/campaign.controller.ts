import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CampaignService } from '../services/campaign.service';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';
import { AuthGuard } from '../shared/guards/auth.guard';


@ApiTags('Campaigns')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('campaigns')
export class CampaignController {

  constructor(
    private readonly campaignService: CampaignService,
  ) {}


  // Create Campaign API
  @Post()
  @ApiOperation({
    summary: 'Create a new campaign',
  })
  @ApiResponse({
    status: 201,
    description: 'Campaign created successfully',
  })
  async createCampaign(
    @Body() createCampaignDto: CreateCampaignDto,
  ) {
    return this.campaignService.createCampaign(
      createCampaignDto,
    );
  }


  // Get All Campaigns API
  @Get()
  @ApiOperation({
    summary: 'Get all campaigns',
  })
  @ApiResponse({
    status: 200,
    description: 'Campaigns fetched successfully',
  })
  async getAllCampaigns() {
    return this.campaignService.getAllCampaigns();
  }


  // Get Campaign By ID API
  @Get(':id')
  @ApiOperation({
    summary: 'Get campaign by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Campaign fetched successfully',
  })
  async getCampaignById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.campaignService.getCampaignById(id);
  }


  // Update Campaign API
  @Put(':id')
  @ApiOperation({
    summary: 'Update campaign by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Campaign updated successfully',
  })
  async updateCampaign(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.updateCampaign(
      id,
      updateCampaignDto,
    );
  }


  // Delete Campaign API
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete campaign by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Campaign deleted successfully',
  })
  async deleteCampaign(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.campaignService.deleteCampaign(id);
  }

}