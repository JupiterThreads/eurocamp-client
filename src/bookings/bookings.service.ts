import { Injectable, Logger } from '@nestjs/common';
import { CreateBookingDto } from '@/bookings/dto/create-booking.dto';
import { HttpService } from '@nestjs/axios';
import { BaseHttpService } from '@/base-http.service';
import { Booking } from '@/bookings/interfaces/booking.interface';

@Injectable()
export class BookingsService extends BaseHttpService {
  constructor(httpService: HttpService) {
    const logger = new Logger(BookingsService.name);
    super(httpService, logger);
  }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.httpPost<Booking>('/bookings', createBookingDto);
  }

  async findAll(): Promise<Booking[]> {
    return this.httpGet<Booking[]>('/bookings');
  }

  async findOne(id: string): Promise<Booking> {
    return this.httpGet<Booking>(`/bookings/${id}`);
  }

  async remove(id: string): Promise<void> {
    await this.httpDelete(`/bookings/${id}`);
  }
}
