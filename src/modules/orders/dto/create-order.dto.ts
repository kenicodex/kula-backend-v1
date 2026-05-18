import { IsString, IsArray, IsOptional, IsNumber, IsIn, IsObject, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty() @IsString() chefId: string;
  @ApiProperty() @IsArray() items: { menuItemId: string; name: string; quantity: number; unitPrice: number }[];
  @ApiProperty({ enum: ['delivery', 'pickup'] }) @IsIn(['delivery', 'pickup']) fulfillmentType: string;
  @ApiPropertyOptional() @IsOptional() @IsObject() deliveryAddress?: { address: string; city: string; coordinates?: [number, number] };
  @ApiPropertyOptional() @IsOptional() @IsDateString() pickupTime?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) deliveryFee?: number;
}
