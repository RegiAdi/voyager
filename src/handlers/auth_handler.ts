import {Request, Response} from 'express';
import {User} from '../models/user';
import {BaseHandler} from './base_handler';

interface AuthService {
  register(user: User): Promise<string>;
}

export class AuthHandler extends BaseHandler {
  constructor(private authService: AuthService) {
    super();
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const userId = await this.authService.register({
        email: req.body.email,
      });

      this.send(res, 201, 'SUCCESS', 'User created sucessfully', {
        id: userId,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      this.send(res, 500, 'FAIL', 'Failed to create user', null);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    this.send(res, 201, 'SUCCESS', 'User authenticated sucessfully', {
      id: 1,
      email: 'user@demo.com',
    });
  }

  async logout(req: Request, res: Response): Promise<void> {
    this.send(res, 201, 'SUCCESS', 'User logged out sucessfully', null);
  }
}
