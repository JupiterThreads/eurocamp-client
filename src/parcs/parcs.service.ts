import { Injectable, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { CreateParcDto } from './dto/create-parc.dto';
import { Parc } from './interfaces/parc.interface';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ParcsService {
  private readonly logger = new Logger(ParcsService.name);

  constructor(private readonly httpService: HttpService) {}

  async create(createParcDto: CreateParcDto) {
    const { data } = await firstValueFrom(
      this.httpService.post<Parc>('/parcs', createParcDto).pipe(
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

  async findAll(): Promise<Parc[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Parc[]>('/parcs').pipe(
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

  async findOne(id: string): Promise<Parc> {
    const { data } = await firstValueFrom(
      this.httpService.get<Parc>(`/parcs/${id}`).pipe(
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

  async remove(id: string): Promise<void> {
    await firstValueFrom(
      this.httpService.delete<void>(`/parcs/${id}`).pipe(
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
