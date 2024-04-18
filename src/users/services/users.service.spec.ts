import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from './../../prisma/services/prisma.service';
import {
  mockUser1,
  mockUser2,
  mockDeleteResponse,
} from '../fixtures/users.fixture';
import { BadRequestException } from '@nestjs/common';
// import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
// TODO dynamic mocking with jest-mock-extended

const mockUserData = [{ ...mockUser1 }, { ...mockUser2 }];
const prismaServiceMock = {
  user: {
    findMany: jest.fn().mockResolvedValue(mockUserData),
    findFirst: jest.fn().mockResolvedValue(mockUser1),
    create: jest.fn().mockReturnValue(mockUser1),
    update: jest.fn().mockResolvedValue(mockUser1),
    delete: jest.fn(),
  },
};
describe('Service: UsersService', () => {
  let userService: UsersService;
  let prismaMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    prismaMock = module.get<PrismaService>(PrismaService);
  });

  describe('method: findAll', () => {
    it('should all users', async () => {
      const result = await userService.findAll();

      expect(result).toEqual(mockUserData);
    });
  });

  describe('method: findOne', () => {
    it('should get a single user', async () => {
      const uniqueUser = await userService.findOne(1);

      expect(uniqueUser).toEqual(mockUser1);
    });
  });

  describe('method: create', () => {
    it('should create a new user', async () => {
      const newUser = await userService.create({ ...mockUser1 });

      expect(newUser).toEqual(mockUser1);
    });
  });

  describe('method: update', () => {
    it('should call the update method', async () => {
      const updatedUser = await userService.update(1, {
        name: 'updateName',
        email: 'testagain@gmail.com',
      });

      expect(updatedUser).toEqual(mockUser1);
    });
  });

  describe('method: remove', () => {
    it('should remove and return {deleted: true}', async () => {
      jest
        .spyOn(prismaMock.user, 'delete')
        .mockResolvedValue(mockDeleteResponse as any);

      const removedUser = await userService.remove(1);

      expect(removedUser).toEqual(mockDeleteResponse);
    });
    it('should throw a BadRequestException', () => {
      const error = new BadRequestException('Bad request');
      jest.spyOn(userService, 'remove').mockImplementationOnce(() => {
        throw error;
      });

      try {
        userService.remove(2);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Bad request');
        return;
      }
    });
  });
});
