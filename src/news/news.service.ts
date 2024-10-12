
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './schemas/news.schema';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';
import { LoggerService } from 'src/utils/logging/logger.service';
import { slugify } from 'transliteration';
import { ImageService } from './image.service';

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(News.name) private newsModel: Model<News>,
        private readonly loggerService: LoggerService,
        private readonly imageService: ImageService,
    ) { }

    async create(createNewsDto: CreateNewsDto): Promise<News> {
        const slug = this.generateSlug(createNewsDto.title);
        
        const existingNews = await this.newsModel.findOne({ slug });
        if (existingNews) {
            throw new ConflictException(`Новина з ярликом "${slug}" вже існує`);
        }
    
        let { content } = createNewsDto;
    
        const imageRegex = /<img.*?src="([^"]+)".*?>/g;
       
        let match;
        const imagePromises = [];
    
        while ((match = imageRegex.exec(content)) !== null) {
            const imageUrl = match[1];
    
            if (imageUrl.startsWith('data:image/')) {
                imagePromises.push(this.imageService.saveBase64Image(imageUrl, createNewsDto.title));
            } else {
                imagePromises.push(this.imageService.downloadImage(imageUrl, createNewsDto.title));
            }
        }
        console.log(imagePromises);
        const savedImageObjects = await Promise.all(imagePromises);
        
        savedImageObjects.forEach((imageObj) => {
            const escapedUrl = imageObj.originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            content = content.replace(new RegExp(escapedUrl, 'g'), imageObj.url);
        });
    
        createNewsDto.content = content;
        createNewsDto.images = savedImageObjects.map(image => image.url);
    
        const news = new this.newsModel({ ...createNewsDto, slug });
        return news.save();
    }
    
    async searchNews(searchParams: any): Promise<News[]> {
        const { query, date, topic } = searchParams;
    
        const filters: any = {};
    
        if (query) {
          filters.$or = [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
            { sections: { $regex: query, $options: 'i' } },
          ];
        }
    
        if (date) {
          const startDate = new Date(date);
          const endDate = new Date(date);
          endDate.setHours(23, 59, 59, 999);
          filters.createdAt = { $gte: startDate, $lte: endDate };
        }
    
        if (topic) {
          filters.sections = { $in: [topic] };
        }
    
        return this.newsModel.find(filters).exec();
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
        const updatedNews = await this.newsModel
            .findOneAndUpdate({ slug }, updateNewsDto, { new: true })
            .exec();
        if (!updatedNews) throw new NotFoundException('News not found');
        return updatedNews;
    }

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
