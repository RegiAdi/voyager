import {Request, Response} from 'express';

export class UserHandler {
  getOneUser(req: Request, res: Response): void {
    res.send('Voyager /users/1');
    console.log('GET /users/1');
  }
}
