import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { ParcsModule } from './parcs/parcs.module';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from './http-config.service';

@Module({
  imports: [
    UsersModule,
    BookingsModule,
    ParcsModule,
    HttpModule.registerAsync({ useClass: HttpConfigService }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
