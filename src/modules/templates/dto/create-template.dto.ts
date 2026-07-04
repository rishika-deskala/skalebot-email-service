import { IsString, IsNotEmpty, IsOptional, IsObject, IsInt, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTemplateDto {
  @ApiProperty({ description: 'The unique name of the template', example: 'Welcome Template' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Subject of the email template containing variables', example: 'Hello {{userName}}, welcome!' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'Body text or HTML of the email template containing variables', example: 'Hi {{userName}}, thanks for joining.' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiPropertyOptional({ description: 'JSON object defining metadata schema for all referenced variables', example: { userName: 'John Doe' } })
  @IsObject()
  @IsOptional()
  variables?: Record<string, any>;

  @ApiProperty({ description: 'Company ID scope for this template', example: 1 })
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty({ description: 'Associated email configuration ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  emailConfigId: number;

  @ApiPropertyOptional({ description: 'Status of the template', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
