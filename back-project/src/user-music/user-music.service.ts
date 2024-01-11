import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from '../music/entities/music.entity';
import { Repository } from 'typeorm';
import { UserMusic } from '../music/entities/userMusic.entity';
import { User } from 'src/users/entities/user.entity';
import { Equal } from 'typeorm';
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
    const { trackName, artworkUrl100, previewUrl } = await checkAPI(trackId);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    checkAPI(trackId);
    const music = await findMusic(
      trackId,
      trackName,
      artworkUrl100,
      previewUrl,
      this.musicRepository,
    );

    let userMusic = await findUserMusic(
      user.id,
      music.id,
      this.userMusicRepository,
    );

    if (userMusic) {
      return await toggleLike(
        music,
        this.musicRepository,
        userMusic,
        this.userMusicRepository,
      );
    } else {
      userMusic = await createUserMusic(user, music, this.userMusicRepository);
      return await toggleLike(
        music,
        this.musicRepository,
        userMusic,
        this.userMusicRepository,
      );
    }
  }

  async dislikeMusic(trackId: number, userId: number) {
    const { trackName, artworkUrl100, previewUrl } = await checkAPI(trackId);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    checkAPI(trackId);
    const music = await findMusic(
      trackId,
      trackName,
      artworkUrl100,
      previewUrl,
      this.musicRepository,
    );
    let userMusic = await findUserMusic(
      user.id,
      music.id,
      this.userMusicRepository,
    );

    if (userMusic) {
      return await toggleDislike(
        music,
        this.musicRepository,
        userMusic,
        this.userMusicRepository,
      );
    } else {
      userMusic = await createUserMusic(user, music, this.userMusicRepository);
      return await toggleDislike(
        music,
        this.musicRepository,
        userMusic,
        this.userMusicRepository,
      );
    }
  }
  async getLikedMusic(userId: number) {
    return this.userMusicRepository.find({
      where: {
        userId: Equal(userId),
        liked: 0,
      },
      relations: ['trackId'], // replace 'track' with the name of the relation to the Music/Track entity
    });
  }
}
