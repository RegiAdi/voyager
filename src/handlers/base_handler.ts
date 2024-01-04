import {Response} from 'express';

interface Payload {
  statusCode: number;
  status: 'success' | 'error';
  message: string;
  data: null | object | Array<object>;
}

export abstract class BaseHandler {
  protected payload: Payload;

  constructor() {
    this.payload = {
      statusCode: 500,
      status: 'error',
      message: 'An error occured',
      data: {},
    };
  }

  send(res: Response, payload: Payload): void {
    res.status(payload.statusCode).json({
      status: payload.status,
      message: payload.message,
      data: payload.data,
    });
  }
}
