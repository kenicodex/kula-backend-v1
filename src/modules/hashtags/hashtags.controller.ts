import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HashtagsService } from './hashtags.service';

@ApiTags('Hashtags')
@Controller('hashtags')
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Get('trending')
  @ApiOperation({ summary: 'Get trending hashtags' })
  trending(@Query('limit') limit?: number) {
    return this.hashtagsService.trending(limit);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search hashtags by name' })
  search(@Query('q') q: string) {
    return this.hashtagsService.search(q ?? '');
  }
}
