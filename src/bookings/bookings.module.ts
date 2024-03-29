import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@/http-exception.filters';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BookingsController],
  providers: [
    BookingsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class BookingsModule {}
