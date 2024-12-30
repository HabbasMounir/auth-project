import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.email = email;
    user.password = hashedPassword; // In a real application, make sure to hash the password before storing it

    return this.usersRepository.save(user);
  }
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    const hashedPassword = user.password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!user || !isValidPassword) { // In a real application, make sure to hash the password and compare the hashed values
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  // Method to find a user by UUID
  async findById(uuid: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { uuid } }); // Ensure the property name matches the entity
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}