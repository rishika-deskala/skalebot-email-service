import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { TemplateDao } from '../dao/template.dao';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { UpdateTemplateDto } from '../dto/update-template.dto';
import { SendTemplateDto } from '../dto/send-template.dto';
import { EmailTemplate } from '../models/template.model';
import { PaginatedResponse } from '../interfaces/paginated-response.interface';
import { Op } from 'sequelize';

@Injectable()
export class TemplateService {
  constructor(private readonly templateDao: TemplateDao) { }

  /**
   * Validates that all placeholders in the format {{variableName}} within subject and body
   * are defined in the variables object.
   */
  private validateTemplateVariables(subject: string, body: string, variables?: Record<string, any>) {
    const regex = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;
    const referencedVars = new Set<string>();

    let match;
    // Reset regex lastIndex just in case
    regex.lastIndex = 0;
    while ((match = regex.exec(subject)) !== null) {
      referencedVars.add(match[1]);
    }

    regex.lastIndex = 0;
    while ((match = regex.exec(body)) !== null) {
      referencedVars.add(match[1]);
    }

    if (referencedVars.size > 0) {
      const providedKeys = variables ? Object.keys(variables) : [];
      const missing = Array.from(referencedVars).filter(v => !providedKeys.includes(v));
      if (missing.length > 0) {
        throw new BadRequestException(`Missing definition for referenced template variables: ${missing.join(', ')}`);
      }
    }
  }

  async create(createTemplateDto: CreateTemplateDto, user: any): Promise<EmailTemplate> {
    const { name, subject, body, variables } = createTemplateDto;


    const companyId = user?.companyId || createTemplateDto.companyId;

    // 1. Unique name per company
    const existing = await this.templateDao.findAll({
      name,
      companyId,
    });
    if (existing && existing.length > 0) {
      throw new ConflictException(`Template with name "${name}" already exists for company ID ${companyId}`);
    }

    // 2. Variable formatting & definition validation
    this.validateTemplateVariables(subject, body, variables);

    // 3. Track createdBy and updatedBy
    const userId = user?.id || user?.userId || 0;

    return this.templateDao.create({
      ...createTemplateDto,
      companyId,      // override with token-derived companyId
      createdBy: userId,
      updatedBy: userId,
    } as any);
  }

  async findAll(
    companyId: number,
    query: { limit?: number; offset?: number; search?: string },
  ): Promise<PaginatedResponse<EmailTemplate>> {
    const limit = query.limit ? Number(query.limit) : 10;
    const offset = query.offset ? Number(query.offset) : 0;

    const filter: any = { companyId };

    if (query.search) {
      filter.name = {
        [Op.like]: `%${query.search}%`,
      };
    }

    const { count, rows } = await this.templateDao.findAndCountAll(filter, limit, offset);

    return {
      count,
      rows,
    };
  }

  async findById(id: number, companyId: number): Promise<EmailTemplate> {
    const template = await this.templateDao.findById(id, companyId);
    return template;
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto, user: any): Promise<EmailTemplate> {
    // Always use companyId from JWT token 
    const companyId = user?.companyId || 0;
    const template = await this.templateDao.findById(id, companyId);

    // Check duplicate name per company on rename
    if (updateTemplateDto.name && updateTemplateDto.name !== template.name) {
      const existing = await this.templateDao.findAll({
        name: updateTemplateDto.name,
        companyId: template.companyId,
      });
      if (existing && existing.length > 0) {
        throw new ConflictException(`Template with name "${updateTemplateDto.name}" already exists for this company`);
      }
    }

    // Validate variables if subject, body, or variables are being updated
    const newSubject = updateTemplateDto.subject !== undefined ? updateTemplateDto.subject : template.subject;
    const newBody = updateTemplateDto.body !== undefined ? updateTemplateDto.body : template.body;
    const newVariables = updateTemplateDto.variables !== undefined ? updateTemplateDto.variables : template.variables;

    this.validateTemplateVariables(newSubject, newBody, newVariables);

    const userId = user?.id || user?.userId || 0;

    return this.templateDao.update(id, {
      ...updateTemplateDto,
      companyId: template.companyId,   // never allow companyId to change on update
      updatedBy: userId,
    });
  }

  async delete(id: number, companyId: number): Promise<void> {
    await this.templateDao.findById(id, companyId);
    await this.templateDao.delete(id);
  }


  private renderTemplate(text: string, variables?: Record<string, string>): string {
    if (!variables || Object.keys(variables).length === 0) {
      return text;
    }

    return text.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, varName) => {
      return variables[varName] !== undefined ? variables[varName] : match;
    });
  }

  //Sends a template to multiple recipients by rendering per-recipient variables. 
  async send(
    templateId: number,
    companyId: number,
    sendTemplateDto: SendTemplateDto,
  ): Promise<{ total: number; results: { email: string; status: string }[] }> {
    const template = await this.findById(templateId, companyId);

    const results = sendTemplateDto.recipients.map((recipient) => {
      const renderedSubject = this.renderTemplate(template.subject, recipient.variables);
      const renderedBody = this.renderTemplate(template.body, recipient.variables);

      return {
        email: recipient.email,
        subject: renderedSubject,
        body: renderedBody,
        emailConfigId: sendTemplateDto.emailConfigId,
        status: 'queued',
      };
    });

    return {
      total: results.length,
      results: results.map(({ email, status }) => ({ email, status })),
    };
  }
}

