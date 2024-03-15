import { Injectable, Logger } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseHttpService } from '@/base-http.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService extends BaseHttpService {
  constructor(httpService: HttpService) {
    const logger = new Logger(UsersService.name);
    super(httpService, logger);
  }

  async getUsers(): Promise<User[]> {
    return this.httpGet<User[]>('/users');
  }

  async getUser(id: string): Promise<User> {
    return this.httpGet<User>(`/users/${id}`);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.httpPost<User>('/users', createUserDto);
  }

  async removeUser(id: string): Promise<void> {
    await this.httpDelete(`/users/${id}`);
  }
}
