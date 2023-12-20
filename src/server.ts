import * as express from 'express';

export class Server {
  http: express.Express;
  router: express.Router;

  constructor() {
    this.http = express();
    this.router = express.Router();
  }

  listen(port: string): void {
    this.http.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  }
}
