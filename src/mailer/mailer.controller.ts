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
    const { phone, region } = dto;

    const subject = 'Нова заявка на вступ до профсоюза';
    const text = `Имя: ${region}\nТелефон: ${phone}`;
    const html = `
      <p>Регіон: ${region}</p>
      <p>Телефон: ${phone}</p>
    `;

    return this.mailerService.sendMail(
      // 'taar12sh@gmail.com',
      'e.a.poduzova@gmail.com',

      subject,
      text,
      html,
    );
  }
}
