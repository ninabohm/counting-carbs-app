import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserModel } from '../domain/model/user.model';
import { User } from '@prisma/client';

export const Public = () => SetMetadata('public', true);

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') userId: string): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Public()
  @Post()
  register(@Body() user: UserModel): Promise<UserModel> {
    return this.userService.register(user);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Put(':id')
  updateUserData(@Body() user: UserModel, @Param('id') userId: string) {
    return this.userService.updateUserData(user, userId);
  }
}
