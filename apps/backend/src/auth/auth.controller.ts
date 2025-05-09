import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, ValidateUserDto } from './dtos/create-users.dto';
import { FileUploadInterceptor } from 'src/shared/file-upload/file-upload.interceptor';
import { AuthRequest } from '../../../../packages/Interfaces/auth-request.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileUploadInterceptor)
  register(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const body = createUserDto;
    if (file) {
      body.avatar = `/uploads/${file.filename}`;
    }

    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() validateUserDto: ValidateUserDto) {
    return this.authService.login(validateUserDto);
  }

  @Get('users')
  users() {
    return this.authService.getUsers();
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@Req() req: AuthRequest) {
    const user = req.user;
    return this.authService.getProfile(user._id);
  }
}
