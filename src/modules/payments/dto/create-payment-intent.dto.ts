import { IsString, IsNumber, Min, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentIntentDto {
  @ApiProperty() @IsString() referenceId: string;
  @ApiProperty({ enum: ['booking', 'order', 'grocery'] }) @IsIn(['booking', 'order', 'grocery']) referenceType: string;
  @ApiProperty() @IsNumber() @Min(1) amount: number;
  @ApiProperty() @IsString() currency: string;
}
