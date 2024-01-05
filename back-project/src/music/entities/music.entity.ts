import {
  Column,
  Entity,
  OneToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserMusic } from './userMusic.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number; // Este é o ID gerado pelo banco de dados

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @Column()
  trackId: number;

  @Column()
  trackName: string;

  @Column()
  artworkUrl100: string;

  @Column()
  previewUrl: string;

  @OneToMany(() => UserMusic, (userMusic) => userMusic.trackId)
  userMusics: UserMusic[];

  constructor(music: Partial<Music>) {
    Object.assign(this, music);
  }
}
