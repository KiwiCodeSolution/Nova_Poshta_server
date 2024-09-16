import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './schemas/news.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]), // Додаємо модель тут
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
