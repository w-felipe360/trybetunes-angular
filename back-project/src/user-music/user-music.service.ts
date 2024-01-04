import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Music } from '../music/entities/music.entity';
import { Repository } from 'typeorm';
import { UserMusic } from '../music/entities/userMusic.entity';
import { User } from 'src/users/entities/user.entity';
// import { Equal } from 'typeorm';
import {
  checkAPI,
  createUserMusic,
  findMusic,
  findUserMusic,
  toggleDislike,
  toggleLike,
} from './helpers/user.music.helper';

@Injectable()
export class UserMusicService {
  constructor(
    @InjectRepository(Music)
    private musicRepository: Repository<Music>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserMusic)
    private userMusicRepository: Repository<UserMusic>,
  ) {}
  // create(createMusicDto: CreateMusicDto) {
  //   return 'This action adds a new music';
  // }

 async likeMusic(trackId: number, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    checkAPI(trackId);
    const music = await findMusic(trackId, this.musicRepository);

    const existingUserMusic = await findUserMusic(
      user.id,
      music.id,
      this.userMusicRepository,
    );
    if (existingUserMusic) {
      await toggleLike(existingUserMusic, this.userMusicRepository);
    } else {
      await createUserMusic(user, music, this.userMusicRepository);
    }
  }

  async dislikeMusic(trackId: number, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    checkAPI(trackId);
    const music = await findMusic(trackId, this.musicRepository);
    const existingUserMusic = await findUserMusic(
      user.id,
      music.id,
      this.userMusicRepository,
    );
    if (existingUserMusic) {
      await toggleDislike(existingUserMusic, this.userMusicRepository);
    } else {
      await createUserMusic(user, music, this.userMusicRepository);
    }
  }
}
