import { IsArray, IsBoolean, IsEmail, IsString } from "class-validator";

export class CreateSubscriptionDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  subscribed: boolean;

  @IsArray()
  array_subscripts: string[]
}
