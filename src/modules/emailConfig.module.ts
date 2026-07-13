import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailConfig } from '../models/emailConfig.model';
import { EmailConfigController } from '../controllers/emailConfig.controller';
import { EmailConfigService } from '../services/emailConfig.service';
import { EmailConfigDao } from '../dao/emailConfig.dao';

@Module({
  imports: [SequelizeModule.forFeature([EmailConfig])],
  controllers: [EmailConfigController],
  providers: [EmailConfigService, EmailConfigDao],
  exports: [EmailConfigService],
})
export class EmailConfigsModule {}