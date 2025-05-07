import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  address: string;

  @IsString()
  referredBy: number;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class ValidateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
