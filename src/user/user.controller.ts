import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('register')
  create(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.register(email, password);
  }
}