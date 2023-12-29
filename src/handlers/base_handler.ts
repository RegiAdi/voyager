import {Response} from 'express';

export abstract class BaseHandler {
  send(
    res: Response,
    statusCode: number,
    status: string,
    message: string,
    data: null | object | Array<object>
  ): void {
    res.status(statusCode).json({
      status: status,
      message: message,
      data: data,
    });
  }
}
