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

    try {
      const user = await this.authService.register(request);

      this.payload = {
        statusCode: 201,
        status: 'success',
        message: 'User created sucessfully',
        data: user,
      };
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        this.payload = {
          statusCode: 500,
          status: 'error',
          message: error.message,
          data: {},
        };
      }
    }

    this.send(res, this.payload);
  }

  async login(req: Request, res: Response): Promise<void> {
    this.payload = {
      statusCode: 200,
      status: 'success',
      message: 'User authenticated sucessfully',
      data: {
        id: 1,
        email: 'user@demo.com',
      },
    };

    this.send(res, this.payload);
  }

  async logout(req: Request, res: Response): Promise<void> {
    this.payload = {
      statusCode: 200,
      status: 'success',
      message: 'User logged out sucessfully',
      data: null,
    };

    this.send(res, this.payload);
  }
}
