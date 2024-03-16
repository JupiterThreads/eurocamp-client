import { Module } from '@nestjs/common';
import { ParcsService } from '@/parcs/parcs.service';
import { ParcsController } from '@/parcs/parcs.controller';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@/http-exception.filters';

@Module({
  imports: [HttpModule],
  controllers: [ParcsController],
  providers: [
    ParcsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class ParcsModule {}
