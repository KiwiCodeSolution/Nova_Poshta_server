import { IsString } from "class-validator";

export class UpdateNewsDto {
    @IsString()
    title?: string;

    sections?: string[];

    slug: string;

    metaTags?: string[];

    @IsString()
    content?: string;

    status?: 'published' | 'created' | 'archived';

    publishDate?: Date;
}