import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserInfoProvider } from '../shared/providers/user-info.provider';
import { TemplateService } from '../services/template.service';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { UpdateTemplateDto } from '../dto/update-template.dto';

@ApiTags('Templates')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('templates')
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly userInfoProvider: UserInfoProvider,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new email template' })
  @ApiResponse({ status: 201, description: 'The template has been successfully created.' })
  async create(@Body() createTemplateDto: CreateTemplateDto) {
    const user = this.userInfoProvider.getUser();
    return this.templateService.create(createTemplateDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all email templates (paginated)' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Templates successfully retrieved.' })
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('search') search?: string,
  ) {
    const user = this.userInfoProvider.getUser();
    const companyId = user?.companyId || 0;
    return this.templateService.findAll(companyId, { limit, offset, search });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get template details by ID' })
  @ApiResponse({ status: 200, description: 'Template retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Template not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.userInfoProvider.getUser();
    const companyId = user?.companyId || 0;
    return this.templateService.findById(id, companyId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing template by ID' })
  @ApiResponse({ status: 200, description: 'Template updated successfully.' })
  @ApiResponse({ status: 404, description: 'Template not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    const user = this.userInfoProvider.getUser();
    return this.templateService.update(id, updateTemplateDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft-delete a template by ID' })
  @ApiResponse({ status: 200, description: 'Template successfully soft-deleted.' })
  @ApiResponse({ status: 404, description: 'Template not found.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = this.userInfoProvider.getUser();
    const companyId = user?.companyId || 0;
    await this.templateService.delete(id, companyId);
    return { success: true, message: `Template with ID ${id} soft-deleted.` };
  }
}
