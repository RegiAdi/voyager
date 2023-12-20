import {Express, Request, Response, Router} from 'express';

interface Server {
  http: Express;
  router: Router;
  listen(port: string): void;
}

interface Config {
  getAppPort(): string;
}

export class Kernel {
  constructor(
    private config: Config,
    private server: Server
  ) {}

  boot() {
    this.server.http.get('/', (req: Request, res: Response) => {
      res.send('Voyager /');
      console.log('GET /');
    });

    this.server.http.get('/me', (req: Request, res: Response) => {
      res.send('Voyager /me');
      console.log('GET /me');
    });

    this.server.http.get('/users/1', (req: Request, res: Response) => {
      res.send('Voyager /users/1');
      console.log('GET /users/1');
    });

    this.server.http.use(this.server.router);

    this.server.listen(this.config.getAppPort());
  }
}
