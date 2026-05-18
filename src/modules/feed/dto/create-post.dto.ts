import { IsString, IsArray, IsOptional, IsIn, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ enum: ['photo', 'video', 'recipe', 'daily_special'] })
  @IsIn(['photo', 'video', 'recipe', 'daily_special']) type: string;

  @ApiProperty({ type: [String] }) @IsArray() @IsString({ each: true }) mediaUrls: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() caption?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) hashtags?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() linkedMenuItem?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() dailySpecialPrice?: number;
  @ApiPropertyOptional() @IsOptional() @IsDateString() dailySpecialExpiresAt?: string;
}
