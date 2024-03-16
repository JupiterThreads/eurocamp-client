import { Module } from '@nestjs/common';
import { UsersModule } from '@/users/users.module';
import { BookingsModule } from '@/bookings/bookings.module';
import { ParcsModule } from '@/parcs/parcs.module';
import { UsersService } from '@/users/users.service';
import { UsersController } from '@/users/users.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from '@/http-config.service';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { parsedEnv } from '@/env';
import { ParcsService } from '@/parcs/parcs.service';
import { ParcsController } from '@/parcs/parcs.controller';
import { BookingsController } from '@/bookings/bookings.controller';
import { BookingsService } from '@/bookings/bookings.service';

@Module({
  imports: [
    UsersModule,
    BookingsModule,
    ParcsModule,
    HttpModule.registerAsync({ useClass: HttpConfigService }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          url: parsedEnv.REDIS_URL,
          ttl: 10,
        }),
      }),
    }),
  ],
  controllers: [UsersController, ParcsController, BookingsController],
  providers: [
    UsersService,
    ParcsService,
    BookingsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
