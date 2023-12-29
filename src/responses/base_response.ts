import {Response} from 'express';

export class BaseResponse {
  async send(
    res: Response,
    statusCode: number,
    status: string,
    message: string,
    data: object | Array<object>
  ): Promise<void> {
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
