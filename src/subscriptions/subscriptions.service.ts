import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from './schemas/subscription.schema';
import { CreateSubscriptionDto } from './dto/create_subscription.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
        private mailerService: MailerService,
    ) { }

    async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
        const newSubscription = new this.subscriptionModel(createSubscriptionDto);
        this.logSubscriptionToFile(newSubscription.name, newSubscription.email);
        await this.sendConfirmationEmail(newSubscription.email);
        return newSubscription.save();
    }

    async confirmSubscription(email: string): Promise<Subscription> {
        const subscription = await this.subscriptionModel.findOne({ email });

        if (!subscription) {
            throw new Error('Subscription not found');
        }
        subscription.subscribed = true;
        return subscription.save();
    }

    private async sendConfirmationEmail(email: string) {
        const confirmationLink = `http://localhost:3000/subscription/confirm?email=${email}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Подтверждение подписки на новости',
            text: `Для подтверждения подписки перейдите по ссылке: ${confirmationLink}`,
        });
    }

    logSubscriptionToFile(name: string, email: string) {
        const logDirectory = path.join(process.cwd(), 'logs', 'subscriptions');
        const logFilePath = path.join(logDirectory, 'subscription_logs.txt');

        if (!fs.existsSync(logDirectory)) {
            console.log('Директория не найдена, создаем...');
            try {
                fs.mkdirSync(logDirectory, { recursive: true });
                console.log('Директория создана.');
            } catch (err) {
                console.error('Ошибка при создании директории:', err);
                return;
            }
        } else {
            console.log('Директория существует.');
        }

        const logEntry = `Дата: ${new Date().toLocaleString()}, Имя: ${name}, Email: ${email}\n`;

        fs.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                console.error('Ошибка при записи логов о подписке:', err);
            } else {
                console.log('Лог подписки успешно записан.');
            }
        });
    }
}
