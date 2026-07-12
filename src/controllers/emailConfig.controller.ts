import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EmailConfigService } from '../services/emailConfig.service';
import { CreateEmailConfigDto } from '../dto/emailConfig.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserInfoProvider } from '../shared/providers/user-info.provider';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('emailConfigs')
export class EmailConfigController {
  constructor(
    private readonly emailConfigService: EmailConfigService,
    private readonly userInfoProvider: UserInfoProvider,
  ) {}

  @Post()
  async create(@Body() createDto: CreateEmailConfigDto) {
    const user = this.userInfoProvider.getUser();
    const companyId = user?.companyId;
    return this.emailConfigService.createConfig(createDto, companyId);
  }

  @Get('company/:companyId')
  async getByCompany(@Param('companyId', ParseIntPipe) companyId: number) {
    return this.emailConfigService.getConfigsByCompany(companyId);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.emailConfigService.getConfigById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<CreateEmailConfigDto>,
  ) {
    return this.emailConfigService.updateConfig(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.emailConfigService.deleteConfig(id);
    return { success: true, message: 'Email config disabled' };
  }
}