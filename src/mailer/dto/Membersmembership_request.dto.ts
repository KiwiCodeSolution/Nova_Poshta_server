
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class MembershipRequestDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;
}