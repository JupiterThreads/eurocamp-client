import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { CreateParcDto } from '@/parcs/dto/create-parc.dto';
import { Parc } from '@/parcs/interfaces/parc.interface';
import { BaseHttpService } from '@/base-http.service';

@Injectable()
export class ParcsService extends BaseHttpService {
  constructor(httpService: HttpService) {
    const logger = new Logger(ParcsService.name);
    super(httpService, logger);
  }

  async create(createParcDto: CreateParcDto): Promise<Parc> {
    return this.httpPost<Parc>('/parcs', createParcDto);
  }

  async findAll(): Promise<Parc[]> {
    return this.httpGet<Parc[]>('/parcs');
  }

  async findOne(id: string): Promise<Parc> {
    return this.httpGet<Parc>(`/parcs/${id}`);
  }

  async remove(id: string): Promise<void> {
    await this.httpDelete(`/parcs/${id}`);
  }
}
