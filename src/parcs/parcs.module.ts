import { Module } from '@nestjs/common';
import { ParcsService } from '@/parcs/parcs.service';
import { ParcsController } from '@/parcs/parcs.controller';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@/http-exception.filters';
import { HttpConfigService } from '@/http-config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
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
