import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    console.log(createUserDto.username);
    user.username = createUserDto.username;
    user.description = null;
    user.image = '../assets/profile.png';
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDto.password, salt);

    this.usersRepository.insert(user);
    return { message: 'user added successfully' };
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
  async findByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async login(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    console.log('user do service ->', user);
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    user.username = updateUserDto.username;
    user.description = updateUserDto.description;
    user.image = updateUserDto.image;
    await this.entityManager.save(user);
  }

  async remove(id: number) {
    await this.usersRepository.delete({ id });
    return { message: 'user deleted successfully' };
  }
}
