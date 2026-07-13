import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailConfigDao } from '../dao/emailConfig.dao';
import { SendMailDto } from '../dto/sendMail.dto';

@Injectable()
export class sendMailService {
  private readonly logger = new Logger(sendMailService.name);

  constructor(private readonly emailConfigDao: EmailConfigDao) {}

  async sendMail(configId: number, mailDto: SendMailDto): Promise<any> {
    if (!mailDto.recipients || (Array.isArray(mailDto.recipients) && mailDto.recipients.length === 0)) {
      throw new BadRequestException('Recipient email is required');
    }

    const config = await this.emailConfigDao.findOne(configId);
  
    if (!config) {
      throw new NotFoundException(
        `EmailConfig with ID ${configId} not found`,
      );
    }
    if (!config.isActive) {
      throw new BadRequestException(
        'This Email Configuration is disabled',
      );
    }
    
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure, 
      auth: {
        user: config.username,
        pass: config.password,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: config.fromEmail,
        to: Array.isArray(mailDto.recipients) ? mailDto.recipients.join(', ') : mailDto.recipients,
        subject: mailDto.subject,
        html: mailDto.html,
        text: mailDto.text,
        cc: mailDto.cc,
        bcc: mailDto.bcc,
        // Use the stored Reply-To address if one is configured
        ...(config.replyTo ? { replyTo: config.replyTo } : {}),
      });
      this.logger.log(`Email sent successfully: ${info.messageId}`);
      return info;
    } catch (error: any) {
      this.logger.error(`Error sending email with configId ${configId}: ${error.message}`);
      throw error;
    }
  }
}


