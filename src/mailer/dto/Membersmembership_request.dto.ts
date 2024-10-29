import { IsOptional, IsString } from 'class-validator';

export class MembershipRequestDto {
    @IsString()
    firstName: string;
  
    @IsOptional()
    @IsString()
    lastName: string;
  
    @IsString()
    phone: string;
  }