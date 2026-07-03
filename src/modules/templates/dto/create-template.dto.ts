import { IsString, IsNotEmpty, IsOptional, IsObject, IsInt, IsBoolean } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsObject()
  @IsOptional()
  variables?: object;

  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsInt()
  @IsNotEmpty()
  emailConfigId: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  @IsOptional()
  createdBy?: number;

  @IsInt()
  @IsOptional()
  updatedBy?: number;
}
