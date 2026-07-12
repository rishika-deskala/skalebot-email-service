import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsArray, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @ApiProperty({
    example: [
      'john.doe@example.com',
      'jane.smith@example.com'
    ],
    description: 'List of recipient email addresses'
  })
  @IsEmail({}, { each: true })
  recipients: string[];


  @ApiPropertyOptional({
    example: ['audit@example.com'],
    description: 'CC recipients',
  })
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  cc?: string[];

  @ApiPropertyOptional({
    example: ['audit@example.com'],
    description: 'BCC recipients',
  })
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  bcc?: string[];

  @ApiProperty({
    example: 'Welcome to SkaleBot'
  })
  @IsString()
  subject: string;

  @ApiProperty({
    example: '<h1>Welcome!</h1><p>This is an HTML email.</p>'
  })
  @IsString()
  html: string;

  @ApiPropertyOptional({
    example: 'Welcome! This is a plain text version of the email.'
  })
  @IsOptional()
  @IsString()
  text?: string;
}