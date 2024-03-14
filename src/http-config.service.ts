import { HttpModuleOptionsFactory, HttpModuleOptions } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: 'http://localhost:3001/api/1',
    };
  }
}
