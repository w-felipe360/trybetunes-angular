import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Music } from './entities/music.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private musicRepository: Repository<Music>,
  ) {}
  // create(createMusicDto: CreateMusicDto) {
  //   return 'This action adds a new music';
  // }

  async searchAlbuns(artist: string) {
    const artistNameURL = encodeURIComponent(artist).replace(/%20/g, '+');
    const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;
    try {
      const response = await axios.get(getAlbumsAPI);
      console.log(response.data);
      return response.data; // Isso retornará os dados da resposta
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getMusics(id: number) {
    console.log(`getMusics called with id: ${id}`);
    const getMusicsAPI = `https://itunes.apple.com/lookup?id=${id}&entity=song`;
    try {
      const response = await axios.get(getMusicsAPI);
      const musics = await Promise.all(
        response.data.results.map(async (music: any) => {
          const musicFromDB = await this.musicRepository.findOne({
            where: { trackId: music.trackId },
          });
          return {
            ...music,
            likes: musicFromDB ? musicFromDB.likes : 0,
            dislikes: musicFromDB ? musicFromDB.dislikes : 0,
          };
        }),
      );
      console.log(musics.slice(1).map((music) => music.trackName));
      return musics;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async likeMusic(trackId: number) {
    let music = await this.musicRepository.findOne({ where: { trackId } });
    if (!music) {
      music = this.musicRepository.create({ trackId, likes: 0, dislikes: 0 });
    }
    music.likes++;
    await this.musicRepository.save(music);
  }

  async dislikeMusic(trackId: number) {
    let music = await this.musicRepository.findOne({ where: { trackId } });
    if (!music) {
      music = this.musicRepository.create({ trackId, likes: 0, dislikes: 0 });
    }
    music.dislikes++;
    await this.musicRepository.save(music);
  }
}
