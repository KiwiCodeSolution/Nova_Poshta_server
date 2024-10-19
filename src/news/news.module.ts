import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './schemas/news.schema';
import { LoggerService } from 'src/utils/logging/logger.service';
import { ImageService } from './image.service';
import { ConfigService } from './config';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
  ],
  controllers: [NewsController],
  providers: [NewsService, LoggerService, ImageService, ConfigService],
})
export class NewsModule { }
