import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nova_poshta'),
    UserModule,
    AuthModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
