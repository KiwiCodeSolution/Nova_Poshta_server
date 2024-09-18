import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscriptions.controller';
import { SubscriptionService } from './subscriptions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionSchema } from './schemas/subscription.schema';
import { LoggerService } from 'src/utils/logging/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subscription', schema: SubscriptionSchema }]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io', 
        port: 2525,
        auth: {
          user: 'your_user',
          pass: 'your_pass',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
    }),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService , LoggerService],
})
export class SubscriptionsModule {}