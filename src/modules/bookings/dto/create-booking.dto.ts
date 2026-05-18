import { IsString, IsNumber, IsDateString, IsOptional, IsObject, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty() @IsString() chefId: string;
  @ApiProperty() @IsString() serviceType: string;
  @ApiProperty() @IsString() hireType: string;
  @ApiProperty() @IsDateString() date: string;
  @ApiPropertyOptional() @IsOptional() @IsString() timeSlot?: string;
  @ApiProperty() @IsNumber() @Min(1) numberOfGuests: number;
  @ApiProperty() @IsObject() location: { address: string; city: string; coordinates?: [number, number] };
  @ApiPropertyOptional() @IsOptional() @IsString() occasion?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() specialInstructions?: string;
}
