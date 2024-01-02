import {Request, Response} from 'express';
import {User} from '../models/user';
import {BaseHandler} from './base_handler';

interface AuthService {
  register(user: User): Promise<User>;
}

export class AuthHandler extends BaseHandler {
  constructor(private authService: AuthService) {
    super();
  }

  async register(req: Request, res: Response): Promise<void> {
    const request = req.body;
    let response = {
      statusCode: 500,
      status: 'failed',
      message: '',
      data: {},
    };

    try {
      const user = await this.authService.register(request);

      response = {
        statusCode: 201,
        status: 'success',
        message: 'User created sucessfully',
        data: user,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error('An error occured: ', error.message);
      }

      response = {
        statusCode: 500,
        status: 'error',
        message: 'Failed to create user',
        data: {},
      };
    }

    this.send(
      res,
      response.statusCode,
      response.status,
      response.message,
      response.data
    );
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
