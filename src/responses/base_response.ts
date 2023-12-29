import {Response} from 'express';

export class BaseResponse {
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

  run(): void {
    console.log('BaseResponse.run()');
  }
}
