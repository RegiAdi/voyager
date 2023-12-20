import * as express from 'express';

interface Config {
  getAppPort(): string;
}

export class Server {
  private httpServer: express.Express;
  router: express.Router;

  constructor(private config: Config) {
    this.httpServer = express();
    this.router = express.Router();
  }

  listen(): void {
    const port = this.config.getAppPort();

    this.httpServer.get('/', (req: express.Request, res: express.Response) => {
      res.send('Voyager');
    });

    this.router.get('/me', (req: express.Request, res: express.Response) => {
      res.send('Voyager /me');
    });

    this.httpServer.use('/users', this.router);

    this.httpServer.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  }
}
