import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParcsService } from './parcs.service';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateParcDto } from './dto/create-parc.dto';
import { Parc as ParcContract } from './parc-contract.dto';

@ApiTags('parcs')
@Controller('parcs')
@ApiInternalServerErrorResponse({
  description: 'Error accessing Eurocamp service',
})
export class ParcsController {
  constructor(private readonly parcsService: ParcsService) {}

  @Post()
  @ApiCreatedResponse({ type: ParcContract })
  async create(@Body() createParcDto: CreateParcDto): Promise<ParcContract> {
    return this.parcsService.create(createParcDto);
  }

  @Get()
  @ApiOkResponse({ type: [ParcContract] })
  async findAll(): Promise<ParcContract[]> {
    return this.parcsService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: ParcContract })
  async findOne(@Param('id') id: string): Promise<ParcContract> {
    return this.parcsService.findOne(id);
  }

  @Delete(':id')
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Parc has been successfully deleted',
  })
  async remove(@Param('id') id: string) {
    await this.parcsService.remove(id);
  }
}
