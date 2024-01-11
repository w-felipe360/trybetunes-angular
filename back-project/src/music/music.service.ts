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

  async searchAlbuns(artist: string) {
    const artistNameURL = encodeURIComponent(artist).replace(/%20/g, '+');
    const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;
    try {
      const response = await axios.get(getAlbumsAPI);
      return response.data; // Isso retornará os dados da resposta
    } catch (error) {
      throw error;
    }
  }
  async getMusics(id: number) {
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
      return musics;
    } catch (error) {
      throw error;
    }
  }
}
