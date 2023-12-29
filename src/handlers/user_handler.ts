import {Request, Response} from 'express';
import {BaseResponse} from '../responses/base_response';

export class UserHandler extends BaseResponse {
  async getOneUser(req: Request, res: Response): Promise<void> {
    console.log('GET /users/1');

    const baseResponse = new BaseResponse();
    baseResponse.send(res, 200, 'SUCCESS', 'User retrieved sucessfully', {
      id: 1,
      name: 'user1',
    });
  }
}
