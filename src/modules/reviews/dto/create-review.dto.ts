import { IsString, IsNumber, IsOptional, Min, Max, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty() @IsString() bookingId: string;
  @ApiProperty() @IsString() chefId: string;
  @ApiProperty() @IsNumber() @Min(1) @Max(5) rating: number;
  @ApiPropertyOptional() @IsOptional() @IsString() comment?: string;
  @ApiPropertyOptional() @IsOptional() @IsObject()
  categories?: { foodQuality?: number; punctuality?: number; cleanliness?: number; communication?: number };
}
