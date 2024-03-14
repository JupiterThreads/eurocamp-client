import { Injectable, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from './interfaces/user.interface';
import { AxiosError } from 'axios';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly httpService: HttpService) {}

  async getUsers(): Promise<User[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<User[]>('/users').pipe(
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

  async getUser(id: string): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService.get<User>(`/users/${id}`).pipe(
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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService.post<User>('/users', createUserDto).pipe(
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

  async deleteUser(id: string) {
    this.httpService.delete<User>(`/users/${id}`).pipe(
      catchError((error: AxiosError) => {
        this.logger.error(error.response.data);
        const { message, statusCode } = error.response.data as Record<
          string,
          any
        >;
        throw new HttpException(message, statusCode);
      }),
    );
  }
}
