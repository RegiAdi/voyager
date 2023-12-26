import {Express, Request, Response, Router} from 'express';

interface Config {
  getAppPort(): string;
}

interface Server {
  http: Express;
  router: Router;
  listen(port: string): void;
}

interface Database {
  name: string;
  uri: string;
  connect(): Promise<void>;
}

interface UserHandler {
  getOneUser(req: Request, res: Response): void;
}

export class Kernel {
  constructor(
    private config: Config,
    private server: Server,
    private db: Database,
    private userHandler: UserHandler
  ) {}

  boot() {
    this.db.connect();

    this.server.router.get('/', (req: Request, res: Response) => {
      res.send('Voyager /');
      console.log('GET /');
    });

    this.server.router.get('/me', (req: Request, res: Response) => {
      res.send('Voyager /me');
      console.log('GET /me');
    });

    this.server.router.get('/users/1', this.userHandler.getOneUser);

    this.server.http.use(this.server.router);

    this.server.listen(this.config.getAppPort());
  }
}
