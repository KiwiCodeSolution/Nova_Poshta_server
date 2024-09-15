import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './schemas/news.schema';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';
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
        if (updateNewsDto.title) {
            updateNewsDto.slug = this.generateSlug(updateNewsDto.title);
        }
        const updatedNews = await this.newsModel
            .findOneAndUpdate({ slug }, updateNewsDto, { new: true })
            .exec();
        if (!updatedNews) throw new NotFoundException('News not found');
        return updatedNews;
    }

    async delete(slug: string, userId: string): Promise<void> {
        const news = await this.newsModel.findOneAndDelete({ slug }).exec();
        if (news) {
            this.logDeletion(news, userId);  // Логування видалення
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

    private logDeletion(news: News, userId: string): void {
        console.log(`News deleted: ${news.title} by user ${userId}`);
        // Або збереження логу у базу даних
    }
}
