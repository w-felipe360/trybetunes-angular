import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(3, 16)
  username: string;
  @IsString()
  @Length(0, 255)
  description: string;
  image: string;
}
