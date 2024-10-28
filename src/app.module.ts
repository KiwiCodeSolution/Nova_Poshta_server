import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailerController } from './mailer/mailer.controller';
import { MailerService } from './mailer/mailer.service';
import { MailModule } from './mailer/mailer.module';
import { NewsModule } from './news/news.module';
import { ContactsModule } from './contacts/contacts.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilesController } from './files/files.controller';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nova_poshta'),
    UserModule,
    AuthModule,
    MailModule,
    NewsModule,
    ContactsModule,
    SubscriptionsModule,
    FilesModule,
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'uploads'),
        serveRoot: '/uploads/', 
      },
    ),
    FilesModule,
  ],
  controllers: [MailerController, FilesController],
  providers: [MailerService],
})
export class AppModule {}
