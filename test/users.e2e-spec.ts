import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from './../src/prisma/services/prisma.service';
import { mockUser1, mockUser2 } from 'src/users/fixtures/users.fixture';

describe('(e2e) Users', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const userObject = expect.objectContaining({
    id: expect.any(Number),
    name: expect.any(String),
    email: expect.any(String),
    isActive: expect.any(Boolean),
    isVerified: expect.any(Boolean),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);
    await app.init();

    await prisma.user.create({
      data: mockUser1,
    });
    await prisma.user.create({
      data: mockUser2,
    });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('ok!');
  });

  describe('GET /users', () => {
    it('returns a list of users', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        '/users',
      );
      expect(status).toBe(200);
      expect(body).toStrictEqual(expect.arrayContaining([userObject]));
      expect(body).toHaveLength(2);
      expect(body[0].id).toEqual(mockUser1.id);
    });

    // TODO add authentication (guard on e2e testing)
    // it('returns a list of verified users', async () => {
    //   const { status, body } = await request(app.getHttpServer()).get(
    //     '/users/verified',
    //   );

    //   console.log('body',body)
    //   expect(status).toBe(200);
    //   expect(body).toStrictEqual(expect.arrayContaining([userObject]));
    //   expect(body).toHaveLength(1);
    //   expect(body[0].id).toEqual(mockUser2.id);
    //   expect(body[0].isVerified).toBeTruthy();
    // });
  });

  describe('GET /users/{id}', () => {
    it('returns a given user', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/users/${mockUser1.id}`,
      );

      expect(status).toBe(200);
      expect(body).toStrictEqual(userObject);
      expect(body.id).toEqual(mockUser1.id);
    });

    it('fails to return non existing user', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/users/122220`,
      );

      expect(status).toBe(404);
    });

    it('fails to return user with invalid id type', async () => {
      const { status } = await request(app.getHttpServer()).get(
        `/users/string-id`,
      );

      expect(status).toBe(400);
    });
  });

  describe('POST /users', () => {
    it('creates an user', async () => {
      const beforeCount = await prisma.user.count();
      const { status } = await request(app.getHttpServer())
        .post('/users')
        .send({
          id: 2888,
          name: 'ng-user',
          email: 'ggkisor@gmail.com',
          isVerified: false,
          isActive: false,
        });

      const afterCount = await prisma.user.count();
      expect(status).toBe(201);
      expect(afterCount - beforeCount).toBe(1);
    });
  });
});