import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmailConfig } from '../models/emailConfig.model';
import { CreateEmailConfigDto } from '../dto/emailConfig.dto';

@Injectable()
export class EmailConfigDao {
  constructor(
    @InjectModel(EmailConfig)
    private readonly emailConfigModel: typeof EmailConfig,
  ) {}

  async create(createEmailConfigDto: CreateEmailConfigDto): Promise<EmailConfig> {
    return this.emailConfigModel.create(createEmailConfigDto as any);
  }

  async findAllByCompany(companyId: number): Promise<EmailConfig[]> {
    return this.emailConfigModel.findAll({
      where: { companyId, isActive: true },
    });
  }

  async findOne(id: number): Promise<EmailConfig> {
    const config = await this.emailConfigModel.findByPk(id);
    if (!config) {
      throw new NotFoundException(`EmailConfig with ID ${id} not found`);
    }
    return config;
  }

  async update(id: number, updateData: Partial<CreateEmailConfigDto>): Promise<EmailConfig> {
    const config = await this.findOne(id);
    return config.update(updateData);
  }

  async delete(id: number): Promise<void> {
    const config = await this.findOne(id);
    await config.update({ isActive: false });
  }
}

