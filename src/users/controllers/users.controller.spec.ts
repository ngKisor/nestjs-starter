import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { PrismaModule } from './../../prisma/prisma.module';
import { mockUser1 } from '../fixtures/users.fixture';
import { NotFoundException } from '@nestjs/common';

describe('Controller: UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            getVerifiedUsers: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('method: findAll', () => {
    const mockUsers = [mockUser1];
    it('should get list of users', async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValueOnce(mockUsers);

      const users = await controller.findAll();

      expect(users).toEqual(mockUsers);
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('method: remove', () => {
    it('should remove a user', async () => {
      const userId = 1;
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(mockUser1);
      jest.spyOn(userService, 'remove').mockResolvedValueOnce(true as any);

      const result = await controller.remove(userId);

      expect(result).toEqual(true);
      expect(userService.findOne).toHaveBeenCalledWith(userId);
      expect(userService.remove).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const userId = 1;
      const error = new NotFoundException(
        `User with id ${userId} doesnot exists`,
      );

      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(undefined);
      jest.spyOn(controller, 'remove').mockImplementationOnce(() => {
        throw error;
      });

      try {
        controller.remove(2);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        return;
      }

      expect(userService.findOne).toHaveBeenCalledWith(userId);
      expect(userService.remove).not.toHaveBeenCalled();
    });
  });
});
