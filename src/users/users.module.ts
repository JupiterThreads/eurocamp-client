import { Module } from '@nestjs/common';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@/http-exception.filters';

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class UsersModule {}
