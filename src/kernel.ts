import * as express from 'express';
import 'dotenv/config';

export class Kernel {
  public app: express.Express;

  constructor() {
    this.app = express();
  }

  listen() {
    const port = process.env.APP_PORT || 3000;

    this.app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  }

  boot() {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('Express + TypeScript Server');
    });

    this.listen();
  }
}
