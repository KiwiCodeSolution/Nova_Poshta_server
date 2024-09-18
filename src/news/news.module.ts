import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './schemas/news.schema';
import { LoggerService } from 'src/utils/logging/logger.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]), // Додаємо модель тут
  ],
  controllers: [NewsController],
  providers: [NewsService , LoggerService],
})
export class NewsModule {}
