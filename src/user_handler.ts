import {Request, Response} from 'express';
import {BaseResponse} from './base_response';

export class UserHandler {
  getOneUser(req: Request, res: Response): void {
    console.log('GET /users/1');

    const baseResponse = new BaseResponse();
    baseResponse.send(res, 200, 'SUCCESS', 'User retrieved sucessfully', {
      id: 1,
      name: 'user1',
    });
  }
}
