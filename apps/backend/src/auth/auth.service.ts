import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, ValidateUserDto } from './dtos/create-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // Register user
  async register(body: CreateUserDto) {
    const { email, password, ...rest } = body;

    // 1. Check for existing user with this email
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // 2. Convert referredBy if present
    if (body.referredBy) {
      body.referredBy = new Types.ObjectId(
        body.referredBy,
      ) as unknown as string;
    }

    // 3. Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      ...rest,
    });

    await createdUser.save();
    return this.generateToken(createdUser);
  }

  // Simulate login (In a real app, we’d validate credentials here)
  async login(loginDto: ValidateUserDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async getProfile(userId: string) {
    return this.userModel.findById(userId).select('-password');
  }

  async getUsers(userId?: string) {
    if (userId) {
      return this.userModel
        .find({ _id: { $ne: new Types.ObjectId(userId) } })
        .select('-password');
    } else {
      return this.userModel.find().select('-password');
    }
  }

  private generateToken(user: UserDocument) {
    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
