import { IsString, IsArray, IsOptional, IsNumber, IsIn, Min, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GroceryItemDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() quantity: string;
  @ApiProperty() @IsNumber() @Min(0) estimatedCost: number;
}

export class CreateGroceryListDto {
  @ApiProperty() @IsString() bookingId: string;
  @ApiProperty({ type: [GroceryItemDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => GroceryItemDto) items: GroceryItemDto[];
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) budgetCap?: number;
  @ApiPropertyOptional({ enum: ['app_payment', 'chef_pays', 'client_handles'] })
  @IsOptional() @IsIn(['app_payment', 'chef_pays', 'client_handles']) paymentMethod?: string;
}
