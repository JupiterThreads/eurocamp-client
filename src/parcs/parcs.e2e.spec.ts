import { Test, TestingModule } from '@nestjs/testing';
import { ParcsService } from '@/parcs/parcs.service';
import { Parc } from '@/parcs/interfaces/parc.interface';
import * as request from 'supertest';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { ParcsModule } from '@/parcs/parcs.module';
import { mock, mockReset } from 'jest-mock-extended';

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

describe('Parcs', () => {
  let app: INestApplication;
  const parcsService = mock<ParcsService>();

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

  beforeEach(() => {
    mockReset(parcsService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET parcs should return an array of parcs', () => {
    parcsService.findAll.mockResolvedValue(parcs);
    return request(app.getHttpServer())
      .get('/parcs')
      .expect(HttpStatus.OK)
      .expect(parcs);
  });

  it('/GET parc should return a parc', () => {
    const parc = {
      id: '33076',
      name: 'sunt',
      description: 'Incidunt est dolorum et iusto deserunt rem.',
    };

    parcsService.findOne.mockResolvedValue(parc);

    return request(app.getHttpServer())
      .get(`/parcs/${parc.id}`)
      .expect(HttpStatus.OK)
      .expect(parc);
  });

  it('/POST create parc', () => {
    const createParc = {
      name: 'Pleasure parc',
      description: 'Furthermore, pleasures, pain, and escape.',
    };

    const newParc = { ...createParc, id: '5679' };

    parcsService.create.mockResolvedValue(newParc);

    return request(app.getHttpServer())
      .post('/parcs')
      .send(createParc)
      .expect(HttpStatus.CREATED)
      .expect(newParc);
  });

  it('/DELETE parc', () => {
    const parc = {
      id: '33076',
      name: 'sunt',
      description: 'Incidunt est dolorum et iusto deserunt rem.',
    };

    parcsService.remove.mockImplementation();

    return request(app.getHttpServer())
      .delete(`/parcs/${parc.id}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});
