import { Controller, Post, Body, Get, Query, HttpCode, HttpStatus, Put, BadRequestException } from '@nestjs/common';
import { SubscriptionService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create_subscription.dto';
import { LogSubscriptionDto } from './dto/log_subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) { }

  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscription(createSubscriptionDto);
  }

  @Put()
  update() {

  }

  @Post('confirm')
  async confirm(@Body('email') email: string) {
    console.log('Получен email запроса:', email); 
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    return this.subscriptionService.confirmSubscription(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('log')
  async logSubscription(@Body() logSubscriptionDto: LogSubscriptionDto) {
    const { name, email } = logSubscriptionDto;
    await this.subscriptionService.logSubscriptionToFile(name, email);
    return { message: 'Подписка успешно залогирована' };
  }

}
