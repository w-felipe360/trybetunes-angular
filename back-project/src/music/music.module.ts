import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { UserMusic } from './entities/userMusic.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Music, UserMusic, User])],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
