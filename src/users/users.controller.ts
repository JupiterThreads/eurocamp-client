import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User as UserContract } from './user-contract.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@ApiInternalServerErrorResponse({
  description: 'Error accessing Eurocamp service',
})
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserContract] })
  async getUsers(): Promise<UserContract[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserContract })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async getUser(@Param('id') id: string): Promise<UserContract> {
    return this.usersService.getUser(id);
  }

  @Post()
  @ApiCreatedResponse({ type: UserContract })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserContract> {
    return this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User has been successfully deleted',
  })
  async removeUser(@Param('id') id: string): Promise<void> {
    await this.usersService.removeUser(id);
  }
}
