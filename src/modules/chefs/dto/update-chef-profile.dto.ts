import { PartialType } from '@nestjs/swagger';
import { CreateChefProfileDto } from './create-chef-profile.dto';

export class UpdateChefProfileDto extends PartialType(CreateChefProfileDto) {}
