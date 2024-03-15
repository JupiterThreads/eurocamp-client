import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from '@/bookings/bookings.service';
import { Booking } from '@/bookings/interfaces/booking.interface';
import * as request from 'supertest';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { BookingsModule } from '@/bookings/bookings.module';
import { mock, mockReset } from 'jest-mock-extended';

const bookings: Booking[] = [
  {
    id: 'f2ef861a-57d5-406f-979a-2b82a3039da2',
    user: '4aae8879-e9bd-4354-a075-0bee6292e175',
    parc: 'da4cb5a5-04ae-4d61-b1b0-de9348b16f67',
    bookingdate: '2023-06-13T18:34:26.121Z',
    comments: 'Ut libero aut sit harum minima ad accusamus accusamus qui.',
  },
  {
    id: '026ceea4-0352-45c0-bc7f-a0e9338eb644',
    user: 'c4f75dfe-7609-4d52-9569-411d85d3bfed',
    parc: '5f3b4c1d-1165-4958-8cbf-c114f05f5bab',
    bookingdate: '2023-12-29T13:35:30.379Z',
    comments: 'Error est consequatur dicta quo minus consectetur.',
  },
  {
    id: '2eae8993-2a5f-4f4f-8bf8-bd6a5dbdd86e',
    user: '1f6c8d18-6b30-414b-8807-4fc5ca5696b8',
    parc: '0fdc4510-25f6-4671-8295-ddeb838fbe75',
    bookingdate: '2023-08-19T19:19:49.906Z',
    comments: 'Est officia ut nihil dolore debitis qui quidem amet.',
  },
];

describe('Bookings', () => {
  let app: INestApplication;
  const bookingsService = mock<BookingsService>();

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [BookingsModule],
    })
      .overrideProvider(BookingsService)
      .useValue(bookingsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    mockReset(bookingsService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET bookings should return an array of bookings', () => {
    bookingsService.findAll.mockResolvedValue(bookings);
    return request(app.getHttpServer())
      .get('/bookings')
      .expect(HttpStatus.OK)
      .expect(bookings);
  });

  it('/GET booking should return a booking from id', () => {
    const booking = {
      id: '2eae8993-2a5f-4f4f-8bf8-bd6a5dbdd86e',
      user: '1f6c8d18-6b30-414b-8807-4fc5ca5696b8',
      parc: '0fdc4510-25f6-4671-8295-ddeb838fbe75',
      bookingdate: '2023-08-19T19:19:49.906Z',
      comments: 'Est officia ut nihil dolore debitis qui quidem amet.',
    };

    bookingsService.findOne.mockResolvedValue(booking);
    return request(app.getHttpServer())
      .get(`/bookings/${booking.id}`)
      .expect(HttpStatus.OK)
      .expect(booking);
  });

  it('/POST create booking', () => {
    const createBooking = {
      user: '1f6c8d18-6b30-414b-8807-4fc5ca5696b8',
      parc: '0fdc4510-25f6-4671-8295-ddeb838fbe75',
      bookingdate: '2024-07-13T18:34:26.121Z',
      comments: 'Im bringing two dogs',
    };

    const newBooking = {
      ...createBooking,
      id: '2eae8993-2a5f-4f4f-8bf8-bd6a5dbdd23',
    };

    bookingsService.create.mockResolvedValue(newBooking);

    return request(app.getHttpServer())
      .post('/bookings')
      .send(createBooking)
      .expect(HttpStatus.CREATED)
      .expect(newBooking);
  });

  it('/DELETE booking', () => {
    const booking = {
      id: '2eae8993-2a5f-4f4f-8bf8-bd6a5dbdd86e',
      user: '1f6c8d18-6b30-414b-8807-4fc5ca5696b8',
      parc: '0fdc4510-25f6-4671-8295-ddeb838fbe75',
      bookingdate: '2023-08-19T19:19:49.906Z',
      comments: 'Est officia ut nihil dolore debitis qui quidem amet.',
    };
    bookingsService.remove.mockImplementation();

    return request(app.getHttpServer())
      .delete(`/bookings/${booking.id}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});
