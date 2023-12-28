import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(user: any) {
    // console.log(user);
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateUser(username: string, password: string) {
    let user: User;
    try {
      user = await this.usersService.findByUsername(username);
    } catch (error) {
      return null;
    }

    if (!user) return null;

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
