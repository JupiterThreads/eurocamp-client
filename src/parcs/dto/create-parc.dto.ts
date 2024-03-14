import { IsNotEmpty } from 'class-validator';

export class CreateParcDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
