import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerDto } from './dto/mailer_send.dto';
import { MembershipRequestDto } from './dto/Membersmembership_request.dto';

@Controller('email')
export class MailerController {
  constructor(private readonly mailerService: MailerService) { }

  @Post('send')
  async sendEmail(@Body() dto: MailerDto) {
    const { to, subject, text, html } = dto;
    return this.mailerService.sendMail(to, subject, text, html);
  }

  @Post('membership-request')
  async sendMembershipRequest(@Body() dto: MembershipRequestDto) {
    const { firstName, lastName, phone, email } = dto;

    const subject = 'Новая заявка на вступление в профсоюз';
    const text = `Имя: ${firstName}\nФамилия: ${lastName || 'Не указана'}\nТелефон: ${phone}\nEmail: ${email}`;
    const html = `
      <p>Имя: ${firstName}</p>
      <p>Фамилия: ${lastName || 'Не указана'}</p>
      <p>Телефон: ${phone}</p>
      <p>Email: ${email}</p>
    `;

    return this.mailerService.sendMail(
      // 'taar12sh@gmail.com',
      'E.a.poduzova@gmail.com',
      subject,
      text,
      html,
    );
  }
}
