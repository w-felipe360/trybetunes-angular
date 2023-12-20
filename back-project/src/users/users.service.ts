import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
    user.password = createUserDto.password;
    user.description = null;
    user.image = null;
    // Adicione mais campos aqui se necessário

    this.usersRepository.insert(user);
    return { message: 'user added successfully' };
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
  async login(username: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    user.description = updateUserDto.description;
    await this.entityManager.save(user);
  }

  async remove(id: number) {
    await this.usersRepository.delete({ id });
    return { message: 'user deleted successfully' };
  }
}
