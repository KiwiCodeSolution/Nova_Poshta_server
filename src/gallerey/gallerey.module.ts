import { Module } from '@nestjs/common';
import { GallereyController } from './gallerey.controller';
import { GallereyService } from './gallerey.service';
import { MongooseModule } from '@nestjs/mongoose';
import {Gallerey, GallereySchema } from './schemas/gallerey.schema';
import { LoggerService } from 'src/utils/logging/logger.service';
import { ImageService } from './image.service';
import { ConfigService } from './config';
import { PpoModule } from 'src/ppo/ppo.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallerey.name, schema:GallereySchema }]),
    PpoModule,
  ],
  controllers: [GallereyController],
  providers: [GallereyService, LoggerService, ImageService, ConfigService],
})
export class GallereyModule { }
