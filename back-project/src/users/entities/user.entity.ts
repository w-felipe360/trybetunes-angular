import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  image: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
