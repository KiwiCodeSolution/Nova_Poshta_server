import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateContactDto {
  @IsOptional()
  @IsEmail()
  mail?: string;

  @IsOptional()
  @IsString()
  telegram?: string;

  @IsOptional()
  @IsString()
  viber?: string;

  @IsOptional()
  @IsString()
  messenger?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  youtube?: string;

  @IsOptional()
  @IsString()
  facebook?: string;
}

export class UpdateContactDto extends CreateContactDto {}
