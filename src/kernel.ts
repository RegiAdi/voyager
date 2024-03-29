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
  listen(port: string): Promise<void>;
}

interface Database {
  connect(): Promise<void>;
}

interface Cache {
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
    private cache: Cache,
    private authMiddleware: AuthMiddleware,
    private authHandler: AuthHandler,
    private userHandler: UserHandler
  ) {}

  async boot() {
    await this.db.connect();
    await this.cache.connect();

    this.server.mountGlobalMiddleware();

    this.server.guestRouter.post(
      '/register',
      async (req: Request, res: Response) => {
        await this.authHandler.register(req, res);
      }
    );

    this.server.guestRouter.post(
      '/login',
      async (req: Request, res: Response) => {
        await this.authHandler.login(req, res);
      }
    );

    this.server.guestRouter.use(
      async (req: Request, res: Response, next: NextFunction) => {
        console.log('Guest');
        next();
      }
    );

    this.server.authRouter.use(
      async (req: Request, res: Response, next: NextFunction) => {
        await this.authMiddleware.mount(req, res, next);
      }
    );

    this.server.authRouter.get('/me', async (req: Request, res: Response) => {
      await this.userHandler.getOneUser(req, res);
    });

    this.server.authRouter.get(
      '/logout',
      async (req: Request, res: Response) => {
        await this.authHandler.logout(req, res);
      }
    );

    this.server.http.use(this.config.getBaseUrlPath(), this.server.guestRouter);
    this.server.http.use(this.config.getBaseUrlPath(), this.server.authRouter);

    await this.server.listen(this.config.getAppPort());
  }
}
