import { HttpModuleOptionsFactory, HttpModuleOptions } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { parsedEnv } from '@/env';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: parsedEnv.EUROCAMP_URL,
    };
  }
}
