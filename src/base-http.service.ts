import {
  Logger,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

type Exception = {
  message: string;
  error: string;
  statusCode: number;
};

export class BaseHttpService {
  protected logger: Logger;
  constructor(
    private readonly httpService: HttpService,
    logger?: Logger,
  ) {
    this.logger = logger ? logger : new Logger(BaseHttpService.name);
  }

  async httpGet<T>(url: string): Promise<T> {
    const { data } = await firstValueFrom(
      this.httpService.get<T>(url).pipe(
        catchError((err: AxiosError) => {
          this.logger.error(err.response?.data);
          if (err.response?.data) {
            const { message, statusCode, error } = err.response
              .data as Exception;
            throw new HttpException(message, statusCode, {
              cause: new Error(),
              description: error,
            });
          }
          throw new InternalServerErrorException();
        }),
      ),
    );
    return data;
  }

  async httpPost<T>(url: string, dataIn: any): Promise<T> {
    const { data } = await firstValueFrom(
      this.httpService.post<T>(url, dataIn).pipe(
        catchError((err: AxiosError) => {
          this.logger.error(err.response?.data);
          if (err.response?.data) {
            const { message, statusCode, error } = err.response
              .data as Exception;
            throw new HttpException(message, statusCode, {
              cause: new Error(),
              description: error,
            });
          }
          throw new InternalServerErrorException();
        }),
      ),
    );
    return data;
  }

  async httpDelete(url: string): Promise<void> {
    await firstValueFrom(
      this.httpService.delete<void>(url).pipe(
        catchError((err: AxiosError) => {
          this.logger.error(err.response?.data);
          if (err.response?.data) {
            const { message, statusCode, error } = err.response
              .data as Exception;
            throw new HttpException(message, statusCode, {
              cause: new Error(),
              description: error,
            });
          }
          throw new InternalServerErrorException();
        }),
      ),
    );
  }
}
