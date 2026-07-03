import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailTemplate } from '../../models/template.model';
import { TemplateDao } from './dao/template.dao';

@Module({
  imports: [SequelizeModule.forFeature([EmailTemplate])],
  providers: [TemplateDao],
  exports: [TemplateDao],
})
export class TemplatesModule {}
