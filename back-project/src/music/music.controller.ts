import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MusicService } from './music.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('album')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('search')
  searchAlbuns(@Query('name') name: string) {
    return this.musicService.searchAlbuns(name);
  }
  @Get(':id')
  getMusics(@Param('id') id: string) {
    return this.musicService.getMusics(+id);
  }
}
