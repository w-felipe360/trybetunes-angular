import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  // ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Music } from './music.entity';

@Entity()
export class UserMusic {
  @PrimaryGeneratedColumn()
  id: number; // Este é o ID gerado pelo banco de dados

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @ManyToOne(() => Music)
  @JoinColumn({ name: 'trackId' })
  trackId: Music;

  @Column({ default: 0 })
  liked: number; // 1 se o usuário curtiu a música, -1 se descurtiu, 0 se não fez nenhum

  // ...resto do seu código...
  // ...resto do seu código...
}
