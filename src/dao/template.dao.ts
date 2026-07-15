import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmailTemplate } from '../models/template.model';
import { CreateTemplateDto } from '../dto/create-template.dto';


@Injectable()
export class TemplateDao {
  constructor(
    @InjectModel(EmailTemplate)
    private readonly emailTemplateModel: typeof EmailTemplate,
  ) { }

  async create(createTemplateDto: CreateTemplateDto): Promise<EmailTemplate> {
    return this.emailTemplateModel.create({
      ...createTemplateDto,
    } as any);
  }

  async findAll(filter: any = {}): Promise<EmailTemplate[]> {
    return this.emailTemplateModel.findAll({
      where: {
        isActive: true,
        ...filter,
      },
    });
  }

  async findAndCountAll(
    filter: any = {},
    limit?: number,
    offset?: number,
  ): Promise<{ count: number; rows: EmailTemplate[] }> {
    return this.emailTemplateModel.findAndCountAll({
      where: {
        isActive: true,
        ...filter,
      },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  async findById(id: number, companyId?: number): Promise<EmailTemplate> {
    const where: any = { id, isActive: true };
    if (companyId !== undefined && companyId !== 0) {
      where.companyId = companyId;
    }

    const template = await this.emailTemplateModel.findOne({ where });

    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }

    return template;
  }

  async update(id: number, updateTemplateDto: any): Promise<EmailTemplate> {
    const template = await this.findById(id);

    return template.update(updateTemplateDto);
  }

  async delete(id: number): Promise<void> {
    const template = await this.findById(id);

    // Soft delete logic 
    await template.update({ isActive: false });
  }
}
