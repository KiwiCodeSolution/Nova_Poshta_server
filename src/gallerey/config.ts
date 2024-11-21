import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    get baseUrl(): string {
        return process.env.BASE_URL || 'http://localhost:5000';
        // return process.env.BASE_URL || 'https://kiwicode.tech';
    }
}
