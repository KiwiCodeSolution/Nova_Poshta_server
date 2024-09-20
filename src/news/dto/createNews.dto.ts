import { IsArray, IsDate, IsDateString, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsArray()
  readonly sections: string[];

  @IsString()
  readonly author: string;

  @IsOptional()
  @IsArray()
  readonly metaTags?: string[];

  @IsString()
  readonly content: string;

  @IsOptional()
  @IsEnum(['published', 'created', 'archived'])
  readonly status: 'published' | 'created' | 'archived';
  
  @IsOptional()
  @IsString()
  readonly publishDate?: Date;

  @IsOptional()
  @ValidateNested()
  readonly images: [{
    filenme: String,
    url: String,
  }];
}
