import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  parc: string;

  @IsNotEmpty()
  @IsDateString()
  bookingdate: string;

  @IsNotEmpty()
  @IsString()
  comments: string;
}
