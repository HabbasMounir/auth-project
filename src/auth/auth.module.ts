import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/JwtService';

@Module({
  imports: [
  PassportModule.register({ defaultStrategy: 'jwt' }), // Register Passport with JWT strategy
  JwtModule.register({
    secret: 'your_secret_key', // Replace with your secret key
    signOptions: { expiresIn: '60m' }, // Adjust expiration as needed
  }),
  UserModule, // Import UserModule if AuthService depends on it
],

  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
