import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class News extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;
 
  @Prop({ type: [String], required: true })
  sections: string[];

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: false })
  author: string;

  @Prop({ type: String }) 
  previewImg: string;

  @Prop({ type: [String] })
  metaTags: string[];

  @Prop({ required: true })
  content: string;

  @Prop({ enum: ['published', 'created', 'archived'], default: 'created' })
  status: string;

  @Prop({ type: Date })
  publishDate: Date;

  @Prop({ type: String })
  previewText: string; 

  
  images: string[]
}


export const NewsSchema = SchemaFactory.createForClass(News);

NewsSchema.index({ title: 'text', content: 'text', sections: 'text' });