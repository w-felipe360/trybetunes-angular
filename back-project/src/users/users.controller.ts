import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckUserInDbPipe } from './pipes/check-user-in-db.pipe';
import { ValidateUserPasswordPipe } from './pipes/check-password.pipe';
// import { UserValidationPipe } from './user-validation.pipe';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(CheckUserInDbPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Post('login')
  @UsePipes(ValidateUserPasswordPipe)
  async login(@Body(new ValidationPipe()) loginUserDto: CreateUserDto) {
    const userData = await this.usersService.login(loginUserDto.username);
    console.log(loginUserDto);

    return { message: 'login successful', id: userData.id };
  }

  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('user/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
