
import {
  Injectable,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailConfigDao } from '../dao/emailConfig.dao';
import { CreateEmailConfigDto } from '../dto/emailConfig.dto';
import { EmailConfig } from '../models/emailConfig.model';

@Injectable()
export class EmailConfigService {
  private readonly logger = new Logger(EmailConfigService.name);

  constructor(private readonly emailConfigDao: EmailConfigDao) {}


  private async verifySmtpConnection(dto: CreateEmailConfigDto): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: dto.host,
      port: dto.port,
      secure: dto.secure ?? false,
      auth: {
        user: dto.username,
        pass: dto.password,
      },
      // Limit the verification timeout so the API does not hang indefinitely
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 10_000,
    });

    try {
      await transporter.verify();
      this.logger.log(
        `SMTP verification successful for host=${dto.host} port=${dto.port}`,
      );
    } catch (error: any) {
      this.logger.warn(
        `SMTP verification failed for host=${dto.host} port=${dto.port}: ${error.message}`,
      );
      throw new BadRequestException(
        `SMTP verification failed: ${error.message}. ` +
          'Please check your host, port, username and password.',
      );
    } finally {
      transporter.close();
    }
  }

  async createConfig(
    createEmailConfigDto: CreateEmailConfigDto,
    companyId: number,
  ): Promise<EmailConfig> {
    // Verify SMTP credentials before persisting —  400 on failure
    await this.verifySmtpConnection(createEmailConfigDto);
    return this.emailConfigDao.create({ ...createEmailConfigDto, companyId } as CreateEmailConfigDto & { companyId: number });
  }

  async getConfigsByCompany(companyId: number): Promise<EmailConfig[]> {
    return this.emailConfigDao.findAllByCompany(companyId);
  }

  async getConfigById(id: number): Promise<EmailConfig> {
    return this.emailConfigDao.findOne(id);
  }

  async updateConfig(
    id: number,
    updateData: Partial<CreateEmailConfigDto>,
  ): Promise<EmailConfig> {
    return this.emailConfigDao.update(id, updateData);
  }

  async deleteConfig(id: number): Promise<void> {
    return this.emailConfigDao.delete(id);
  }
}

