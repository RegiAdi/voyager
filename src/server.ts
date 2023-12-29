import * as express from 'express';

export class Server {
  http: express.Express;
  guestRouter: express.Router;
  authRouter: express.Router;

  constructor() {
    this.http = express();
    this.guestRouter = express.Router();
    this.authRouter = express.Router();
  }

  mountGlobalMiddleware(): void {
    // for parsing application/json
    this.http.use(express.json());

    // for parsing application/x-www-form-urlencoded
    this.http.use(express.urlencoded({extended: true}));
  }

  listen(port: string): void {
    this.http.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  }
}
