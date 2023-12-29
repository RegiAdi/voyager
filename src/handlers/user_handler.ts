import {Request, Response} from 'express';
import {BaseHandler} from './base_handler';

export class UserHandler extends BaseHandler {
  constructor() {
    super();
  }

  async getOneUser(req: Request, res: Response): Promise<void> {
    this.send(res, 200, 'SUCCESS', 'User retrieved sucessfully', {
      id: 1,
      name: 'user1',
    });
  }
}
