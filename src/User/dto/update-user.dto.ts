import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  readonly idUser: number;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsBoolean()
  readonly isActive: boolean;
}
