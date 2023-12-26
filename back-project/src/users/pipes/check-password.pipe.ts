import {
  PipeTransform,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class ValidateUserPasswordPipe implements PipeTransform<CreateUserDto> {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: CreateUserDto) {
    const user = await this.usersService.findByUsername(value.username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    console.log(user);
    // console.log(user.password);
    const passwordMatch = await bcrypt.compare(value.password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return value;
  }
}
