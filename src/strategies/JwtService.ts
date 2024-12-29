import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // In a real application, make sure to use a secure and unique secret key
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByUsername(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}