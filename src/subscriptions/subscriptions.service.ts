import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from './schemas/subscription.schema';
import { CreateSubscriptionDto } from './dto/create_subscription.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { LoggerService } from 'src/utils/logging/logger.service';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
        private mailerService: MailerService,
        private readonly loggerService: LoggerService,
        
    ) { }

    async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
        const existingSubscription = await this.subscriptionModel.findOne({ email: createSubscriptionDto.email });
    
        if (existingSubscription) {
            throw new Error('Подписка с таким email уже существует');
        }
    
        const newSubscription = new this.subscriptionModel(createSubscriptionDto);
        this.logSubscriptionToFile(newSubscription.name, newSubscription.email);
        await this.sendConfirmationEmail(newSubscription.email);
        return newSubscription.save();
    }


    // async confirmSubscription(email: string): Promise<Subscription> {
    //     const subscription = await this.subscriptionModel.findOne({ email });

    //     if (!subscription) {
    //         throw new Error('Subscription not found');
    //     }
    //     subscription.subscribed = true;
    //     return subscription.save();
    //     console.log(subscription);
    //     return subscription ;
    // }
    async confirmSubscription(email: string): Promise<Subscription | string> {
        const subscription = await this.subscriptionModel.findOne({ email });
    
        if (subscription) {
            // Если подписка существует, удаляем её
            await this.subscriptionModel.deleteOne({ email });
            console.log(`Подписка для ${email} удалена.`);
            return `Подписка для ${email} была удалена.`;
        } else {
            // Если подписка не существует, создаём новую
            const newSubscription = new this.subscriptionModel({
                email,
                name: "Новый подписчик", // Замените на реальное имя или параметр
                subscribed: true,
                array_subscripts: [], // Замените на данные по умолчанию
            });
            await newSubscription.save();
            console.log(`Подписка для ${email} создана.`);
            return newSubscription;
        }
    }
    

    private async sendConfirmationEmail(email: string) {
        
        const confirmationLink = `http://localhost:3000/subscription/confirm?email=${email}`;
console.log(email);
        await this.mailerService.sendMail({
            to: email,
            subject: 'Подтверждение подписки на новости',
            text: `Для подтверждения подписки перейдите по ссылке: ${confirmationLink}`,
        });
    }

    public async logSubscriptionToFile(name: string, email: string): Promise<void> {
        try {
            await this.loggerService.logSubscription(name, email);
            console.log('Лог подписки успешно записан.');
        } catch (error) {
            console.error('Ошибка при записи логов о подписке:', error);
        }
    }
}
