import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('album')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  // @Post()
  // create(@Body() createMusicDto: CreateMusicDto) {
  //   return this.musicService.create(createMusicDto);
  // }

  // @Get()
  // searchSongsByArtistName(name: string) {
  //   return this.musicService.searchSongsByArtistName(name);
  // }

  @Get('search')
  searchAlbuns(@Query('name') name: string) {
    return this.musicService.searchAlbuns(name);
  }
  @Get(':id')
  getMusics(@Param('id') id: string) {
    return this.musicService.getMusics(+id);
  }
  @Post(':id/like')
  async likeMusic(@Param('id') id: number) {
    await this.musicService.likeMusic(+id);
  }
  @Post(':id/dislike')
  async dislikeMusic(@Param('id') id: number) {
    await this.musicService.dislikeMusic(+id);
  }
}
