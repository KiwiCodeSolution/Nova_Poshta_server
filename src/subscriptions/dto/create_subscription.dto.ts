import { IsArray, IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateSubscriptionDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  subscribed: boolean;

  @IsOptional()
  @IsArray()
  array_subscripts: string[]
}
