import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto  } from './dto/createNews.dto';
import {UpdateNewsDto} from './dto/updateNews.dto'
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.newsService.findBySlug(slug);
  }

  @Put(':slug')
  update(@Param('slug') slug: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(slug, updateNewsDto);
  }

  @Delete(':slug/:userId')
  delete(@Param('slug') slug: string, @Param('userId') userId: string) {
    return this.newsService.delete(slug, userId);
  }
}
