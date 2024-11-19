import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PpoService } from './ppo.service';
import { CreatePpoDto } from './dto/create-ppo.dto';
import { UpdatePpoDto } from './dto/update-ppo.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('ppo')
export class PpoController {
  constructor(private readonly ppoService: PpoService) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createPpoDto: CreatePpoDto) {
    return this.ppoService.create(createPpoDto);
  }

  @Get()
  async findAll() {
    return this.ppoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ppoService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updatePpoDto: UpdatePpoDto) {
    return this.ppoService.update(id, updatePpoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return this.ppoService.remove(id);
  }
}
