import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailerController } from './mailer/mailer.controller';
import { MailerService } from './mailer/mailer.service';
import { MailModule } from './mailer/mailer.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nova_poshta'),
    UserModule,
    AuthModule,
    MailModule,
    
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class AppModule {}
