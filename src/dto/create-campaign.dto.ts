import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';


export class CreateCampaignDto {

  @ApiProperty({
    description: 'Campaign name',
    example: 'Diwali Campaign',
  })
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty({
    description: 'Campaign status',
    example: 'ACTIVE',
  })
  @IsString()
  @IsNotEmpty()
  status: string;


  @ApiPropertyOptional({
    description: 'Campaign active status',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;


  @ApiProperty({
    description: 'Template ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  templateId: number;


  @ApiProperty({
    description: 'Email subject',
    example: 'Festival Offer',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;


  @ApiProperty({
    description: 'Email body',
    example: 'Get 50% discount this Diwali',
  })
  @IsString()
  @IsNotEmpty()
  body: string;


  @ApiProperty({
    description: 'Customer IDs',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNotEmpty()
  customerIds: number[];


  @ApiProperty({
    description: 'Company ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  companyId: number;


  @ApiProperty({
    description: 'Email Config ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  emailConfigId: number;

}