import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(payload: any): Promise<User> {
    return this.userService.findByUsername(payload.email);
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.uuid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
