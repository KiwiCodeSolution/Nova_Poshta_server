
import { IsString, IsEmail } from 'class-validator';

export class LogSubscriptionDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
