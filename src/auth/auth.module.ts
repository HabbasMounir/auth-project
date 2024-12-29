import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
  JwtModule.register({
    secret: 'your_secret_key', // Replace with your secret key
    signOptions: { expiresIn: '60m' }, // Adjust expiration as needed
  }),
  UserModule, // Import UserModule if AuthService depends on it
],

  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
