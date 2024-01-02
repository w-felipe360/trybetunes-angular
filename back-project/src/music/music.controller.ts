import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from './interfaces/requestUser.interface';

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
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/like')
  async likeMusic(@Param('id') trackId: string, @Req() req: RequestWithUser) {
    console.log('aqui o trackId ->>>', typeof +trackId); //passar o trackId para number
    const userId = req.user.id;
    return await this.musicService.likeMusic(+trackId, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/dislike')
  async disLikeMusic(
    @Param('id') trackId: string,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return await this.musicService.dislikeMusic(+trackId, userId);
  }
}
