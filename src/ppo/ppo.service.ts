import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ppo } from './schemas/ppo.schema';
import { CreatePpoDto } from './dto/create-ppo.dto';
import { UpdatePpoDto } from './dto/update-ppo.dto';

@Injectable()
export class PpoService {
  constructor(@InjectModel(Ppo.name) private  ppoModel: Model<Ppo>) {}

  async create(createPpoDto: CreatePpoDto): Promise<Ppo> {
    const createdPpo = new this.ppoModel(createPpoDto);
    return createdPpo.save();
  }

  async findAll(): Promise<Ppo[]> {
    return this.ppoModel.find().exec();
  }

  async findOne(id: string): Promise<Ppo> {
    const ppo = await this.ppoModel.findById(id).exec();
    if (!ppo) {
      throw new NotFoundException(`PPO with ID ${id} not found`);
    }
    return ppo;
  }

  async update(id: string, updatePpoDto: UpdatePpoDto): Promise<Ppo> {
    const updatedPpo = await this.ppoModel.findByIdAndUpdate(id, updatePpoDto, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updatedPpo) {
      throw new NotFoundException(`PPO with ID ${id} not found`);
    }
    return updatedPpo;
  }

  async remove(id: string): Promise<void> {
    const result = await this.ppoModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`PPO with ID ${id} not found`);
    }
  }
}
