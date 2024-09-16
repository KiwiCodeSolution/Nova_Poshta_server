import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './schemas/news.schema';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';
import * as fs from 'fs';
import { format } from 'date-fns';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class NewsService {
    constructor(@InjectModel(News.name) private newsModel: Model<News>) { }

    async create(createNewsDto: CreateNewsDto): Promise<News> {
        const slug = this.generateSlug(createNewsDto.title);
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
    async delete(slug: string, userId: string): Promise<void> {
        const news = await this.newsModel.findOneAndDelete({ slug }).exec();
        if (news) {
            this.logDeletion(news, userId); // Логування видалення
        } else {
            throw new NotFoundException('News not found');
        }
    }

    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    private async logDeletion(news: News, userId: string): Promise<void> {
        const logFilePath = 'logs/news_deletions.log';
        const logEntry = `[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}] News deleted: ${news.title} by user ${userId}\n`;

        try {
            
            if (!fs.existsSync('logs')) {
                fs.mkdirSync('logs');
            }
            
            await fs.promises.appendFile(logFilePath, logEntry);
            console.log('Log entry created successfully');
        } catch (error) {
            console.error('Error writing to log file:', error);
        }
    }
}
