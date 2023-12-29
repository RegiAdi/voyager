import {Express, Request, Response, NextFunction, Router} from 'express';

interface Config {
  getAppPort(): string;
}

interface Server {
  http: Express;
  guestRouter: Router;
  authRouter: Router;
  listen(port: string): void;
}

interface Database {
  name: string;
  uri: string;
  connect(): Promise<void>;
}

interface AuthHandler {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
}

interface UserHandler {
  getOneUser(req: Request, res: Response): Promise<void>;
}

export class Kernel {
  constructor(
    private config: Config,
    private server: Server,
    private db: Database,
    private authHandler: AuthHandler,
    private userHandler: UserHandler
  ) {}

  boot() {
    this.db.connect();

    this.server.guestRouter.post('/register', this.authHandler.register);
    this.server.guestRouter.post('/login', this.authHandler.login);
    this.server.authRouter.get('/logout', this.authHandler.logout);

    this.server.guestRouter.use(
      (req: Request, res: Response, next: NextFunction) => {
        console.log('Guest');
        next();
      }
    );

    this.server.guestRouter.get('/', (req: Request, res: Response) => {
      res.send('Voyager /');
      console.log('GET /');
    });

    this.server.authRouter.use(
      (req: Request, res: Response, next: NextFunction) => {
        console.log('Authenticated');
        next();
      }
    );

    this.server.authRouter.get('/me', (req: Request, res: Response) => {
      res.send('Voyager /me');
      console.log('GET /me');
    });

    this.server.authRouter.get('/users/1', this.userHandler.getOneUser);

    this.server.http.use(this.server.guestRouter);
    this.server.http.use(this.server.authRouter);

    this.server.listen(this.config.getAppPort());
  }
}
