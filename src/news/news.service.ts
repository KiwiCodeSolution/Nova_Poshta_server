import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './schemas/news.schema';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';
import { LoggerService } from 'src/utils/logging/logger.service';
import { slugify } from 'transliteration';

@Injectable()
export class NewsService {
    constructor(@InjectModel(News.name)
    private newsModel: Model<News>,
        private readonly loggerService: LoggerService
    ) { }


    async create(createNewsDto: CreateNewsDto): Promise<News> {
        const slug = this.generateSlug(createNewsDto.title);
        const existingNews = await this.newsModel.findOne({ slug });
        if (existingNews) {
            throw new ConflictException(`News with slug "${slug}" already exists`);
        }
        const news = new this.newsModel({ ...createNewsDto, slug });
        return news.save();
    }

    async findAll(): Promise<News[]> {
        return this.newsModel.find().exec();
    }

    async findBySlug(slug: string): Promise<News> {
        const news = await this.newsModel.findOne({ slug }).exec();
        if (!news) throw new NotFoundException('News not found');
        return news;
    }

    async update(slug: string, updateNewsDto: UpdateNewsDto): Promise<News> {
        // if (updateNewsDto.title) {
        //     updateNewsDto.slug = this.generateSlug(updateNewsDto.title);
        // }
        // Женя нам потрібно оновлювати слаг ?
        const updatedNews = await this.newsModel
            .findOneAndUpdate({ slug }, updateNewsDto, { new: true })
            .exec();
        if (!updatedNews) throw new NotFoundException('News not found');
        return updatedNews;
    }
    // зробити перевірку на наявність юзера за таким айді та при видаленні зробити логування ім'я та емейла того хто видаляв 
    // або отримувати з фронта  данные
    async delete(slug: string, userId: string): Promise<void> {
        const news = await this.newsModel.findOneAndDelete({ slug }).exec();
        if (news) {
            await this.loggerService.logDeletion(news.title, userId);
            console.log('Новость успешно удалена и залогирована.');
        } else {
            throw new NotFoundException('News not found');
        }
    }

    private generateSlug(title: string): string {
        return slugify(title, { lowercase: true })
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }





}
