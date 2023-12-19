import * as express from 'express';
import 'dotenv/config';

import {Server} from './server';

export class Kernel {
  constructor(private server: Server) {}

  boot() {
    this.server.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('Voyager');
    });

    this.server.listen();
  }
}
