import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserMusic } from 'src/music/entities/userMusic.entity';

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
  @OneToMany(() => UserMusic, (userMusic) => userMusic.id)
  userMusics: UserMusic[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
