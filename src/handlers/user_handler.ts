import {Request, Response} from 'express';
import {BaseHandler} from './base_handler';

export class UserHandler extends BaseHandler {
  constructor() {
    super();
  }

  async getOneUser(req: Request, res: Response): Promise<void> {
    this.payload = {
      statusCode: 200,
      status: 'success',
      message: 'User retrieved sucessfully',
      data: {
        id: 1,
        name: 'user1',
      },
    };

    this.send(res, this.payload);
  }
}
