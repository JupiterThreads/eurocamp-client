import { IsNotEmpty, IsString } from 'class-validator';

export class CreateParcDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
