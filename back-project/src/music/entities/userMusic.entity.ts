import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Music } from './music.entity';

@Entity()
export class UserMusic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @ManyToOne(() => Music)
  @JoinColumn({ name: 'trackId' })
  trackId: Music;

  @Column({ default: 0 })
  liked: number;
}
