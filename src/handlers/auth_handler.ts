import {Request, Response} from 'express';
import {BaseResponse} from '../responses/base_response';
import {User} from '../models/user';

interface AuthService {
  register(user: User): Promise<string>;
}

export class AuthHandler {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const userId = await this.authService.register({
        email: req.body.email,
      });

      const baseResponse = new BaseResponse();
      baseResponse.send(res, 201, 'SUCCESS', 'User created sucessfully', {
        id: userId,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      const baseResponse = new BaseResponse();
      baseResponse.send(res, 500, 'FAIL', 'Failed to create user', null);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const baseResponse = new BaseResponse();
    baseResponse.send(res, 201, 'SUCCESS', 'User authenticated sucessfully', {
      id: 1,
      email: 'user@demo.com',
    });
  }

  async logout(req: Request, res: Response): Promise<void> {
    const baseResponse = new BaseResponse();
    baseResponse.send(res, 201, 'SUCCESS', 'User logged out sucessfully', null);
  }
}
