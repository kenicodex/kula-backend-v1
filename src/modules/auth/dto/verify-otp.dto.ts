import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty() @IsString() userId: string;
  @ApiProperty() @IsString() otp: string;
}
