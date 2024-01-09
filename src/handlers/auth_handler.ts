import {Request, Response} from 'express';
import {User} from '../models/user';
import {BaseHandler} from './base_handler';

interface AuthService {
  register(user: User): Promise<User>;
  login(user: User): Promise<User>;
  logout(apiToken: string): Promise<boolean>;
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
          data: null,
        };
      }
    }

    this.send(res, this.payload);
  }

  async login(req: Request, res: Response): Promise<void> {
    const request = req.body;

    try {
      const user = await this.authService.login(request);

      this.payload = {
        statusCode: 201,
        status: 'success',
        message: 'User authenticated sucessfully',
        data: user,
      };
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        this.payload = {
          statusCode: 500,
          status: 'error',
          message: error.message,
          data: null,
        };
      }
    }

    this.send(res, this.payload);
  }

  async logout(req: Request, res: Response): Promise<void> {
    const apiToken = req.get('Authorization');

    try {
      const loggedOutUser = await this.authService.logout(apiToken!);

      if (loggedOutUser) {
        this.payload = {
          statusCode: 200,
          status: 'success',
          message: 'User logged out sucessfully',
          data: null,
        };
      } else {
        this.payload = {
          statusCode: 500,
          status: 'error',
          message: "Session doesn't exist",
          data: null,
        };
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        this.payload = {
          statusCode: 500,
          status: 'error',
          message: error.message,
          data: null,
        };
      }
    }

    this.send(res, this.payload);
  }
}
