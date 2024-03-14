import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import * as request from 'supertest';
import {
  INestApplication,
  HttpStatus,
  BadGatewayException,
} from '@nestjs/common';
import { UsersModule } from './users.module';

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

const newUser = {
  id: 'c9029b01-8958-4d5e-9d14-a128837e03a8',
  name: 'James Holden',
  email: 'j.holden@ceres.com',
};

describe('Users', () => {
  let app: INestApplication;
  const usersService = {
    getUsers: async () => users,
    getUser: async () => users[0],
    createUser: async () => newUser,
    removeUser: async () => {},
  };

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

  it('/GET users should return an array of users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK)
      .expect(users);
  });

  it('/GET user should return a user', () => {
    const expectedUser = users[0];
    return request(app.getHttpServer())
      .get(`/users/${expectedUser.id}`)
      .expect(HttpStatus.OK)
      .expect(expectedUser);
  });

  it('/POST create user', () => {
    const createUser = {
      name: 'James Holden',
      email: 'j.holden@ceres.com',
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(createUser)
      .expect(HttpStatus.CREATED)
      .expect(newUser);
  });

  it('/DELETE user', () => {
    return request(app.getHttpServer())
      .delete(`/users/${users[0].id}`)
      .expect(HttpStatus.NO_CONTENT);
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('Users errors', () => {
  let app: INestApplication;

  const usersService = {
    getUsers: async () => {
      throw new BadGatewayException();
    },
  };

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

  it('should catch bad gateway error', () => {
    return request(app.getHttpServer()).get('/users').expect({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Error accessing Eurocamp service',
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
