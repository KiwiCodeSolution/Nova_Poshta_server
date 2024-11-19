import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { GallereyService } from './gallerey.service';
import { CreateGallereyDto } from './dto/createGallerey.dto';
import { UpdateGallereyDto } from './dto/updateGallerey.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('gallerey')

export class GallereyController {
  constructor(private readonly gallereyService: GallereyService) { }

  @Get('id/:id')
  async findById(@Param('id') id: string) {
    return this.gallereyService.findById(id);
  }

  @Post('search')
  searchGallerey(@Body() searchParams: any) {
    return this.gallereyService.searchGallerey(searchParams);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createGallereyDto: CreateGallereyDto) {
    return this.gallereyService.create(createGallereyDto);
  }

  @Get()
  findAll() {
    return this.gallereyService.findAll();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    await this.gallereyService.incrementViews(slug);
    return this.gallereyService.findBySlug(slug);
  }


  @Put(':slug')
  @UseGuards(AuthGuard)
  update(@Param('slug') slug: string, @Body() updateGallereyDto: UpdateGallereyDto) {
    return this.gallereyService.update(slug, updateGallereyDto);
  }

  @Delete(':slug/:userId')
  @UseGuards(AuthGuard)
  delete(@Param('slug') slug: string, @Param('userId') userId: string) {
    return this.gallereyService.delete(slug, userId);
  }


}
