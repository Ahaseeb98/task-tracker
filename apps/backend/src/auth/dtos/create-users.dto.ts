import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class ValidateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
