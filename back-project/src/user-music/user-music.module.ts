import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from '../music/entities/music.entity';
import { UserMusic } from '../music/entities/userMusic.entity';
import { User } from 'src/users/entities/user.entity';
import { UserMusicController } from './user-music.controller';
import { UserMusicService } from './user-music.service';

@Module({
  imports: [TypeOrmModule.forFeature([Music, UserMusic, User])],
  controllers: [UserMusicController],
  providers: [UserMusicService],
})
export class UserMusicModule {}
