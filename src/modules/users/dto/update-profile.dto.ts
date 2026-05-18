import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() avatar?: string;
  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true }) dietaryRestrictions?: string[];
  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true }) allergies?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() fcmToken?: string;
}
