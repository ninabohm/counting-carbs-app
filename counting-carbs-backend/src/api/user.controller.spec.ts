import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { User } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(() => {
    userService = new UserService(prisma);
    userController = new UserController(userService);
  });

  it('should return all users', async () => {
    const mockResponse: User[] = [
      {
        id: 7,
        email: 'alice@wonderland.com',
        firebaseId: '123456',
        plaidAccessToken: 'some token',
        itemId: 'some item',
        cursor: 'some cursor',
      },
      {
        id: 2,
        email: 'peter@neverland.com',
        firebaseId: '123456',
        plaidAccessToken: 'some token',
        itemId: 'some item',
        cursor: 'some cursor',
      },
    ];

    jest.spyOn(userService, 'findAll').mockResolvedValueOnce(mockResponse);

    expect(await userController.getUsers()).toEqual(mockResponse);
  });
});
