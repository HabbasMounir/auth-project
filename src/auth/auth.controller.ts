import { Body, Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const user = await this.userService.validateUser(email, password);
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.validateUser(req.user);
  }
}