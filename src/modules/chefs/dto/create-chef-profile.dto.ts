import { IsString, IsArray, IsOptional, IsBoolean, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChefProfileDto {
  @ApiProperty() @IsString() bio: string;
  @ApiProperty() @IsArray() @IsString({ each: true }) cuisineTypes: string[];
  @ApiProperty() @IsArray() @IsString({ each: true }) mealCategories: string[];
  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true }) signatureDishes?: string[];
  @ApiProperty() @IsArray() @IsString({ each: true }) serviceTypes: string[];
  @ApiProperty() @IsArray() pricing: { hireType: string; rate: number; currency?: string }[];
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() instantBooking?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsObject() availability?: Record<string, any>;
}
