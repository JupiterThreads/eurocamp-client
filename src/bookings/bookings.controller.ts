import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BookingsService } from '@/bookings/bookings.service';
import { CreateBookingDto } from '@/bookings/dto/create-booking.dto';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Booking as BookingContract } from '@/bookings/bookings-contract.dto';

@ApiTags('bookings')
@ApiInternalServerErrorResponse({
  description: 'Error accessing Eurocamp service',
})
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: BookingContract })
  async create(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<BookingContract> {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOkResponse({ type: [BookingContract] })
  async findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookingContract })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Booking has been successfully deleted',
  })
  async remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
