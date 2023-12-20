import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  constructor(music: Partial<Music>) {
    Object.assign(this, music);
  }
}
