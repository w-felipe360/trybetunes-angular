import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CheckUserInDbPipe implements PipeTransform<CreateUserDto> {
  constructor(private userService: UsersService) {}
  async transform(value: CreateUserDto) {
    const user = await this.userService.findByUsername(value.username);
    if (user) {
      throw new BadRequestException(
        'User already exists, please make login to proceed',
      );
    }
    return value;
  }
}
