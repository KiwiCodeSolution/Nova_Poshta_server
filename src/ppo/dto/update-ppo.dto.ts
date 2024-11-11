import { PartialType } from '@nestjs/mapped-types';
import { CreatePpoDto } from './create-ppo.dto';

export class UpdatePpoDto extends PartialType(CreatePpoDto) {}
