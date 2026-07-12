import { Controller, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { sendMailService } from '../services/sendMail.service';
import { SendMailDto } from '../dto/sendMail.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('sendmail')
export class sendMailController {
  constructor(private readonly sendMailService: sendMailService) {}

  @Post(':configId')
  async sendMail(
    @Param('configId', ParseIntPipe) configId: number,
    @Body() body: SendMailDto,
  ) {
    const result = await this.sendMailService.sendMail(configId, body);
    return {
      success: true,
      messageId: result.messageId,
    };
  }
}