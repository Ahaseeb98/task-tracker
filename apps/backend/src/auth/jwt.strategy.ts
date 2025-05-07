import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { USER_TYPE } from '../../../../packages/Types/USERS';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret123', // use env in prod
    });
  }

  validate(payload: USER_TYPE): USER_TYPE {
    return payload;
  }
}
