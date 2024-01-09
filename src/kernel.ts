import {Express, Request, Response, NextFunction, Router} from 'express';

interface Config {
  getAppPort(): string;
  getBaseUrlPath(): string;
}

interface Server {
  http: Express;
  guestRouter: Router;
  authRouter: Router;
  mountGlobalMiddleware(): void;
  listen(port: string): void;
}

interface Database {
  connect(): Promise<void>;
}

interface AuthMiddleware {
  mount(req: Request, res: Response, next: NextFunction): Promise<void>;
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
    private authMiddleware: AuthMiddleware,
    private authHandler: AuthHandler,
    private userHandler: UserHandler
  ) {}

  async boot() {
    await this.db.connect();

    this.server.mountGlobalMiddleware();

    this.server.guestRouter.post('/register', (req: Request, res: Response) => {
      this.authHandler.register(req, res);
    });

    this.server.guestRouter.post('/login', (req: Request, res: Response) => {
      this.authHandler.login(req, res);
    });

    this.server.guestRouter.use(
      (req: Request, res: Response, next: NextFunction) => {
        console.log('Guest');
        next();
      }
    );

    this.server.authRouter.use(
      (req: Request, res: Response, next: NextFunction) => {
        this.authMiddleware.mount(req, res, next);
      }
    );

    this.server.authRouter.get('/me', (req: Request, res: Response) => {
      this.userHandler.getOneUser(req, res);
    });

    this.server.authRouter.get('/logout', (req: Request, res: Response) => {
      this.authHandler.logout(req, res);
    });

    this.server.http.use(this.config.getBaseUrlPath(), this.server.guestRouter);
    this.server.http.use(this.config.getBaseUrlPath(), this.server.authRouter);

    this.server.listen(this.config.getAppPort());
  }
}
