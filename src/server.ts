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

  listen(port: string): void {
    this.http.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  }
}
