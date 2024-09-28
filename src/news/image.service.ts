import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { slugify } from 'transliteration';

@Injectable()
export class ImageService {
    // private uploadDir = path.join(__dirname, '..', 'uploads');
    private uploadDir = path.join(__dirname, '..', '..', 'uploads');

    constructor() {
        try {
            if (!fs.existsSync(this.uploadDir)) {
                fs.mkdirSync(this.uploadDir, { recursive: true });
            }
        } catch (err) {
            throw new Error(`Не удалось создать директорию загрузок: ${err.message}`);
        }
    }

    async saveBase64Image(base64String: string, title: string) {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        const slug = title ? slugify(title.toLowerCase().replace(/\s+/g, '-')) : uuidv4();
        const filename = `${slug}.jpg`;
        const filepath = path.join(this.uploadDir, filename);

        try {
            await fs.promises.writeFile(filepath, buffer);
            const fullUrl = `http://localhost:5000/uploads/${filename}`;
            return { filename, url: fullUrl };
        } catch (err) {
            throw new Error(`Failed to save image: ${err.message}`);
        }
    }

    async downloadImage(imageUrl: string, title: string) {
        const fileExtension = path.extname(imageUrl);
        const slug = title ? slugify(title.toLowerCase().replace(/\s+/g, '-')) : uuidv4();
        const filename = `${slug}${fileExtension}`;
        const filepath = path.join(this.uploadDir, filename);

        try {
            const response = await axios({
                url: imageUrl,
                method: 'GET',
                responseType: 'stream',
            });

            response.data.pipe(fs.createWriteStream(filepath));

            return new Promise((resolve, reject) => {
                response.data.on('end', () => {
                    const fullUrl = `http://localhost:5000/uploads/${filename}`;
                    resolve({ filename, url: fullUrl });
                });

                response.data.on('error', (err) => {
                    reject(new Error(`Failed to download image: ${err.message}`));
                });
            });
        } catch (err) {
            throw new Error(`Failed to download image: ${err.message}`);
        }
    }
}
