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

  @Get('profile')
  @UseGuards(JwtAuthGuard) // Protect the route
  async getProfile(@Req() req: Request) {
    const uuid = req.user?.uuid; // Now TypeScript recognizes req.user
    if (!uuid) {
      throw new Error('User  not found'); // Handle the case where user is not found
    }
    return this.authService.getProfile(uuid); // Pass uuid as a string
  }
}