import { IsString, IsNotEmpty, IsOptional, IsObject, IsInt, IsArray, ValidateNested, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RecipientDto {
  @ApiProperty({ description: 'Recipient email address', example: 'alice@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    description: 'Per-recipient variable values for template placeholders',
    example: { firstName: 'Alice', companyName: 'Acme Corp' },
  })
  @IsObject()
  @IsOptional()
  variables?: Record<string, string>;
}

export class SendTemplateDto {
  @ApiProperty({
    description: 'List of recipients to send the template email to',
    type: [RecipientDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipientDto)
  @IsNotEmpty()
  recipients: RecipientDto[];

  @ApiProperty({ description: 'Email configuration ID to use for sending', example: 1 })
  @IsInt()
  @IsNotEmpty()
  emailConfigId: number;
}
