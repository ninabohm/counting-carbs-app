import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { UserModel } from '../domain/model/user.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(userId: string): Promise<User> {
    const id: number = Math.floor(+userId);
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async register(user: UserModel): Promise<UserModel> {
    await this.createUser(user);
    return user;
  }

  async deleteUser(userId: string) {
    const id: number = Math.floor(+userId);
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async updateUserData(user: UserModel, userId: string) {
    const id: number = Math.floor(+userId);
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: user.email,
        firebaseId: user.firebaseId,
        plaidAccessToken: user.plaidAccessToken,
      },
    });
  }
}
