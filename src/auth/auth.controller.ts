import { Body, Controller, Get, Post, UseGuards, UnauthorizedException, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
// import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtAuthGuard } from '../guards/cutom.guard';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res() res: Response) {
    const user = await this.userService.validateUser(loginDto.email, loginDto.password);
    // const user = await this.authService.validateUser (loginDto.email, loginDto.password);
    const { access_token } = await this.authService.login(user, req.session);
    
    // Set the session ID cookie
    res.cookie('session_id', req.sessionID, { httpOnly: true, secure: true });
    return res.send({ message: 'Login successful', access_token });
  }
  @UseGuards(JwtAuthGuard) 
  @Get('profile')
  async getProfile(@Req() req: Request) {
    return req.user; 
  }
}