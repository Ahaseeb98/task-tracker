import {
  IsEmail,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsOptional()
  @IsMongoId()
  referredBy: string;

  avatar: string;

  @IsIn(['employee', 'employer'])
  role: 'employee' | 'employer';
}

export class ValidateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
