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
import { ParcsService } from '@/parcs/parcs.service';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateParcDto } from '@/parcs/dto/create-parc.dto';
import { Parc as ParcContract } from '@/parcs/parc-contract.dto';

@ApiTags('parcs')
@Controller('parcs')
@ApiInternalServerErrorResponse({
  description: 'Error accessing Eurocamp service',
})
export class ParcsController {
  constructor(private readonly parcsService: ParcsService) {}

  @Post()
  @ApiBadRequestResponse()
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
