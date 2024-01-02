import axios from 'axios';
import { Repository } from 'typeorm';
import { Equal } from 'typeorm';
import { Music } from '../entities/music.entity';
import { UserMusic } from '../entities/userMusic.entity';
export async function checkAPI(trackId: number) {
  const response = await axios.get(
    `https://itunes.apple.com/lookup?id=${trackId}`,
  );

  if (!response.data.results.length) {
    throw new Error('Track not found in API');
  }
}
// async function findUser(userId: number) {
//   return await this.userRepository.findOne({ where: { id: userId } });
// }

export async function findMusic(
  trackId: number,
  musicRepository: Repository<Music>,
) {
  let music = await musicRepository.findOne({
    where: { trackId: trackId },
  });
  if (!music) {
    music = this.musicRepository.create({
      trackId,
      likes: 0,
      dislikes: 0,
    });
    await this.musicRepository.save(music);
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
  userMusic.liked = userMusic.liked === 0 ? 1 : 0;
  await userMusicRepository.save(userMusic);
}
export async function toggleDislike(
  userMusic: UserMusic,
  userMusicRepository: Repository<UserMusic>,
) {
  userMusic.liked = userMusic.liked === 0 ? 1 : 0;
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
  await this.userMusicRepository.save(newUserMusic);
}
