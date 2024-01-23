import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../music/interfaces/requestUser.interface';
import { UserMusicService } from './user-music.service';

@UseGuards(AuthGuard('jwt'))
@Controller('album')
export class UserMusicController {
  constructor(private readonly userMusicService: UserMusicService) {}

  @Post(':id/like')
  async likeMusic(@Param('id') trackId: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return await this.userMusicService.likeMusic(+trackId, userId);
  }
  @Post(':id/dislike')
  async disLikeMusic(
    @Param('id') trackId: string,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return await this.userMusicService.dislikeMusic(+trackId, userId);
  }

  @Get('/:id/relations')
  async getUsers(
    @Req()
    req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return this.userMusicService.findAll(userId);
  }
  

  @Get('/user/favorites')
  getLikedTracks(
    @Req()
    req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return this.userMusicService.getLikedMusic(userId);
  }

}
