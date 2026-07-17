import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailConfig } from '../models/emailConfig.model';
import { sendMailController } from '../controllers/sendMail.controller';
import { sendMailService } from '../services/sendMail.service';
import { EmailConfigDao } from '../dao/emailConfig.dao';
import { TrackingController } from '../controllers/tracking.controller';

@Module({
  imports: [SequelizeModule.forFeature([EmailConfig])],
  controllers: [sendMailController, TrackingController],
  providers: [sendMailService, EmailConfigDao],
  exports: [sendMailService],
})
export class sendMailModule {}
