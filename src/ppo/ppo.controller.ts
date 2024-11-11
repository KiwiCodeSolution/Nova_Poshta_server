import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PpoService } from './ppo.service';
import { CreatePpoDto } from './dto/create-ppo.dto';
import { UpdatePpoDto } from './dto/update-ppo.dto';

@Controller('ppo')
export class PpoController {
  constructor(private readonly ppoService: PpoService) {}

  @Post()
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
  async update(@Param('id') id: string, @Body() updatePpoDto: UpdatePpoDto) {
    return this.ppoService.update(id, updatePpoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ppoService.remove(id);
  }
}
