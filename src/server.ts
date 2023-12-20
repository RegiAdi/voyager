import * as express from 'express';
import {Config} from './config';

export class Server {
  app: express.Express;

  constructor(private config: Config) {
    this.app = express();
  }

  listen(): void {
    const port = this.config.getAppPort();

    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('Voyager');
    });

    this.app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  }
}
