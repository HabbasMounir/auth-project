import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.register(email, password);
  }
}