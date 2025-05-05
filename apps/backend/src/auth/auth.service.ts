import { Injectable } from '@nestjs/common';
import { USER_TYPE } from './../../../../packages/Types/USERS';
@Injectable()
export class AuthService {
  private users: USER_TYPE[] = [];

  // Register user
  register(body: USER_TYPE) {
    this.users.push(body);
    return body;
  }

  // Simulate login (In a real app, we’d validate credentials here)
  login(body: USER_TYPE) {
    const user = this.users.find(
      (u) => u.email === body.email && u.password === body.password,
    );
    if (!user) {
      return null; // Invalid credentials
    }
    return { message: 'Login successful', user };
  }
}
