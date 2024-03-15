import { Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

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
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          const { message, statusCode } = error.response.data as Record<
            string,
            any
          >;
          throw new HttpException(message, statusCode);
        }),
      ),
    );
    return data;
  }

  async httpPost<T>(url: string, dataIn: any): Promise<T> {
    const { data } = await firstValueFrom(
      this.httpService.post<T>(url, dataIn).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          const { message, statusCode } = error.response.data as Record<
            string,
            any
          >;
          throw new HttpException(message, statusCode);
        }),
      ),
    );
    return data;
  }

  async httpDelete(url: string): Promise<void> {
    await firstValueFrom(
      this.httpService.delete<void>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          const { message, statusCode } = error.response.data as Record<
            string,
            any
          >;
          throw new HttpException(message, statusCode);
        }),
      ),
    );
  }
}
