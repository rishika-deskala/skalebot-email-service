import {
  IsString,
  IsInt,
  IsBoolean,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmailConfigDto {
  @ApiProperty({ example: 'Primary SMTP', description: 'Friendly name for this config' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'smtp.gmail.com', description: 'SMTP host' })
  @IsString()
  @IsNotEmpty()
  host: string;

  @ApiProperty({ example: 587, description: 'SMTP port' })
  @IsInt()
  @IsNotEmpty()
  port: number;

  @ApiPropertyOptional({ example: false, description: 'Use TLS (true for port 465)' })
  @IsBoolean()
  @IsOptional()
  secure?: boolean;

  @ApiProperty({ example: 'user@gmail.com', description: 'SMTP auth username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'apppassword123', description: 'SMTP auth password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'noreply@company.com', description: 'Sender email (From header)' })
  @IsEmail()
  @IsNotEmpty()
  fromEmail: string;

  @ApiPropertyOptional({
    example: 'support@company.com',
    description: 'Reply-To email address (optional). If set, replies go here instead of fromEmail.',
  })
  @IsEmail()
  @IsOptional()
  replyTo?: string;

  @ApiPropertyOptional({
    example: 'Gmail',
    description: 'Human-readable provider label (e.g. Gmail, SendGrid, SES)',
  })
  @IsString()
  @IsOptional()
  provider?: string;
}

