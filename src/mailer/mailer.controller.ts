import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerDto } from './dto/mailer_send.dto';
import { MembershipRequestDto } from './dto/Membersmembership_request.dto';

@Controller('email')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendEmail(@Body() dto: MailerDto) {
    const { to, subject, text, html } = dto;
    return this.mailerService.sendMail(to, subject, text, html);
  }
  @Post('membership-request')
  async sendMembershipRequest(@Body() dto: MembershipRequestDto) {
    const { firstName, lastName, phone } = dto;
    
    const subject = 'Новая заявка на вступление в профсоюз';
    const text = `Имя: ${firstName}\nФамилия: ${lastName}\nТелефон: ${phone}`;
    const html = `<p>Имя: ${firstName}</p><p>Фамилия: ${lastName}</p><p>Телефон: ${phone}</p>`;
    
    return this.mailerService.sendMail(
      'admin@example.com', 
      subject,
      text,
      html,
    );
  }
}
