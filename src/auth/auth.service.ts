import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser (email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: User, session: any) {
    const payload = { email: user.email, id: user.uuid };
    const token = this.jwtService.sign(payload);
    
    // Store the token in the session
    session.token = token;

    return { access_token: token };
  }
  async getProfile(uuid: string): Promise<User | null> {
    const user = await this.userService.findById(uuid); // Pass uuid as a string
    if (!user) {
      throw new Error('User  not found'); // Handle the case where the user is not found
    }
    return user; // Return the user object
  }
}
