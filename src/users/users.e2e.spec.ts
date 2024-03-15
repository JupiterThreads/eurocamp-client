import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@/users/users.service';
import { User } from '@/users/interfaces/user.interface';
import * as request from 'supertest';
import { INestApplication, HttpStatus, HttpException } from '@nestjs/common';
import { UsersModule } from '@/users/users.module';
import { mock, mockReset } from 'jest-mock-extended';

const users: User[] = [
  {
    id: '5159b7ff-72d2-4018-8e6b-54e682901a1d',
    name: 'Mellie Wehner',
    email: 'Merle17@yahoo.com',
  },
  {
    id: '4c09dbc0-241a-40c1-9829-ce74b4fe7e72',
    name: 'Preston Ortiz MD',
    email: 'Wanda.Stracke@yahoo.com',
  },
  {
    id: '955b6c50-7d36-42ec-b410-97e15a97d027',
    name: 'Jena Olson',
    email: 'Tia80@yahoo.com',
  },
];

describe('Users', () => {
  let app: INestApplication;
  const usersService = mock<UsersService>();

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    mockReset(usersService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET users should return an array of users', () => {
    usersService.getUsers.mockResolvedValue(users);
    return request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK)
      .expect(users);
  });

  it('should catch bad gateway error', () => {
    usersService.getUsers.mockRejectedValue(
      new HttpException('Bad Gateway', HttpStatus.BAD_GATEWAY),
    );
    return request(app.getHttpServer()).get('/users').expect({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Error accessing Eurocamp service',
    });
  });

  it('/GET user should return a user from id', () => {
    const user = {
      id: '955b6c50-7d36-42ec-b410-97e15a97d027',
      name: 'Jena Olson',
      email: 'Tia80@yahoo.com',
    };

    usersService.getUser.mockResolvedValue(user);
    return request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(HttpStatus.OK)
      .expect(user);
  });

  it('/POST create user', () => {
    const createUser = {
      name: 'James Holden',
      email: 'j.holden@ceres.com',
    };

    const newUser = {
      ...createUser,
      id: 'c9029b01-8958-4d5e-9d14-a128837e03a8',
    };

    usersService.createUser.mockResolvedValue(newUser);

    return request(app.getHttpServer())
      .post('/users')
      .send(createUser)
      .expect(HttpStatus.CREATED)
      .expect(newUser);
  });

  it('/DELETE user', () => {
    const user = {
      id: '955b6c50-7d36-42ec-b410-97e15a97d027',
      name: 'Jena Olson',
      email: 'Tia80@yahoo.com',
    };

    usersService.removeUser.mockImplementation();

    return request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});
