import {Request, Response} from 'express';
import {BaseResponse} from '../responses/base_response';

export class AuthHandler {
  async register(req: Request, res: Response): Promise<void> {
    const baseResponse = new BaseResponse();
    baseResponse.send(res, 201, 'SUCCESS', 'User created sucessfully', {
      id: 1,
      email: 'user@demo.com',
    });
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
