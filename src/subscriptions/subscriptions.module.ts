import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscriptions.controller';
import { SubscriptionService } from './subscriptions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionSchema } from './schemas/subscription.schema';
import { LoggerService } from 'src/utils/logging/logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subscription', schema: SubscriptionSchema }]),
    MailerModule.forRoot({
      transport: {
        host: 'mail.adm.tools', 
        port: 587,
        auth: {
          user: 'ceo@kiwicode.tech',
          pass: '3r2HY9rtv6',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
    }),
   
    ConfigModule.forRoot(),
    UserModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService , LoggerService],
 
})
export class SubscriptionsModule {}