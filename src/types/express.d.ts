import { User } from '../user/user.entity'; // Adjust the import based on your User entity path
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the user property, which can be of type User
    }
  }
}