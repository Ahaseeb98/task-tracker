import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, ValidateUserDto } from './dtos/create-users.dto';
import { FileUploadInterceptor } from 'src/shared/file-upload/file-upload.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileUploadInterceptor)
  register(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createUserDto.avatar = `/uploads/${file.filename}`;
    }

    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() validateUserDto: ValidateUserDto) {
    return this.authService.login(validateUserDto);
  }
}
