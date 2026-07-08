import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailTemplate } from '../models/template.model';
import { TemplateDao } from '../dao/template.dao';
import { TemplateService } from '../services/template.service';
import { TemplateController } from '../controllers/template.controller';

@Module({
  imports: [SequelizeModule.forFeature([EmailTemplate])],
  controllers: [TemplateController],
  providers: [TemplateDao, TemplateService],
  exports: [TemplateDao, TemplateService],
})
export class TemplatesModule { }
