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
import { PpoService } from './ppo/ppo.service';
import { PpoController } from './ppo/ppo.controller';
import { PpoModule } from './ppo/ppo.module';
import { GallereyModule } from './gallerey/gallerey.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nova_poshta'),
    UserModule,
    PpoModule,
    AuthModule,
    MailModule,
    NewsModule,
    GallereyModule,
    ContactsModule,
    SubscriptionsModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads_gallerey'),
    serveRoot: '/uploads_gallerey/',
  }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'preview'), 
      serveRoot: '/preview',  
    }),
  ],
  controllers: [MailerController, FilesController, PpoController],
  providers: [MailerService, PpoService],
})
export class AppModule {}
