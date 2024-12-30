import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);
    const [type, toke] = request.headers.authorization?.split(' ') ?? [];
    const token =type === 'Bearer' ? toke : undefined;

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const user = this.jwtService.verify(token); 
      request.user = user; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}