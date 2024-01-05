import axios from 'axios';
import { Repository } from 'typeorm';
import { Equal } from 'typeorm';
import { Music } from '../../music/entities/music.entity';
import { UserMusic } from '../../music/entities/userMusic.entity';
export async function checkAPI(trackId: number) {
  const response = await axios.get(
    `https://itunes.apple.com/lookup?id=${trackId}`,
  );

  if (!response.data.results.length) {
    throw new Error('Track not found in API');
  }
  return {
    trackName: response.data.results[0].trackName,
    artworkUrl100: response.data.results[0].artworkUrl100,
    previewUrl: response.data.results[0].previewUrl,
  };
}
// async function findUser(userId: number) {
//   return await this.userRepository.findOne({ where: { id: userId } });
// }

export async function findMusic(
  trackId: number,
  trackName: string,
  artworkUrl100: string,
  previewUrl: string,
  musicRepository: Repository<Music>,
) {
  let music = await musicRepository.findOne({
    where: { trackId: trackId },
  });
  if (!music) {
    music = musicRepository.create({
      trackId,
      trackName,
      artworkUrl100,
      previewUrl,
      likes: 0,
      dislikes: 0,
    });
    await musicRepository.save(music);
  }
  return music;
}

export async function findUserMusic(
  userId: number,
  trackId: number,
  userMusicRepository: Repository<UserMusic>,
) {
  return await userMusicRepository.findOne({
    where: {
      userId: Equal(userId),
      trackId: Equal(trackId),
    },
  });
}

export async function toggleLike(
  userMusic: UserMusic,
  userMusicRepository: Repository<UserMusic>,
) {
  userMusic.liked = userMusic.liked === 1 ? 0 : 1;
  await userMusicRepository.save(userMusic);
}

export async function toggleDislike(
  userMusic: UserMusic,
  userMusicRepository: Repository<UserMusic>,
) {
  userMusic.liked = userMusic.liked === -1 ? 0 : -1;
  await userMusicRepository.save(userMusic);
}
export async function createUserMusic(
  user: any,
  music: any,
  userMusicRepository: Repository<UserMusic>,
) {
  const newUserMusic = userMusicRepository.create({
    userId: user,
    trackId: music,
    liked: 1,
  });
  await userMusicRepository.save(newUserMusic);
}
