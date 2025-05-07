import { Injectable } from '@nestjs/common';
import { USER_TYPE } from './../../../../packages/Types/USERS';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, ValidateUserDto } from './dtos/create-users.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private users: USER_TYPE[] = [];

  // Register user
  register(body: CreateUserDto) {
    const user: USER_TYPE = {
      ...body,
      createAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  // Simulate login (In a real app, we’d validate credentials here)
  login(body: ValidateUserDto) {
    const user: USER_TYPE | undefined = this.users.find(
      (u) => u.email === body.email && u.password === body.password,
    );
    if (!user) {
      return null; // Invalid credentials
    }
    return {
      message: 'Login successful',
      user,
      token: this.jwtService.sign(user),
    };
  }
}
