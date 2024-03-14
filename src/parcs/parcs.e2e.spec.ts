import { Test, TestingModule } from '@nestjs/testing';
import { ParcsService } from './parcs.service';
import { Parc } from './interfaces/parc.interface';
import * as request from 'supertest';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { ParcsModule } from './parcs.module';

const parcs: Parc[] = [
  {
    id: '98161',
    name: 'numquam',
    description: 'Ut error nobis dolor iste placeat minus ut.',
  },
  {
    id: '17515',
    name: 'et',
    description: 'Porro voluptatibus dolorem ea occaecati fuga.',
  },
  {
    id: '33076',
    name: 'sunt',
    description: 'Incidunt est dolorum et iusto deserunt rem.',
  },
];

const newParc = {
  id: '5679',
  name: 'Pleasure parc',
  description: 'Furthermore, pleasures, pain, and escape.',
};

describe('Parcs', () => {
  let app: INestApplication;
  const parcsService = {
    findAll: async () => parcs,
    findOne: async () => parcs[0],
    remove: async () => {},
    create: async () => newParc,
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ParcsModule],
    })
      .overrideProvider(ParcsService)
      .useValue(parcsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET parcs should return an array of parcs', () => {
    return request(app.getHttpServer())
      .get('/parcs')
      .expect(HttpStatus.OK)
      .expect(parcs);
  });

  it('/GET parc should return a parc', () => {
    const expectedParc = parcs[0];
    return request(app.getHttpServer())
      .get(`/parcs/${expectedParc.id}`)
      .expect(HttpStatus.OK)
      .expect(expectedParc);
  });

  it('/POST create parc', () => {
    const createParc = {
      name: 'Pleasure parc',
      description: 'Furthermore, pleasures, pain, and escape.',
    };

    return request(app.getHttpServer())
      .post('/parcs')
      .send(createParc)
      .expect(HttpStatus.CREATED)
      .expect(newParc);
  });

  it('/DELETE parc', () => {
    return request(app.getHttpServer())
      .delete(`/parcs/${parcs[0].id}`)
      .expect(HttpStatus.NO_CONTENT);
  });

  afterAll(async () => {
    await app.close();
  });
});
