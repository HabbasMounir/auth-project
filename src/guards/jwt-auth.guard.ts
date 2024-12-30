import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.session.token;

    if (!token) {
      throw new UnauthorizedException('No token found in session');
    }

    // Optionally, you can verify the token here if needed
    return true; // Allow access if token exists
  }
}