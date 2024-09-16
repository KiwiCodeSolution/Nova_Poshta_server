import { IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  readonly title: string;

  readonly sections: string[];

  @IsString()
  readonly author: string;

  readonly slug?: string;

  readonly metaTags?: string[];

  @IsString()
  readonly content: string;
  readonly status: 'published' | 'created' | 'archived';
  readonly publishDate?: Date;
}
