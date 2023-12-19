import * as express from 'express';

export class Server {
  app: express.Express;

  constructor() {
    this.app = express();
  }

  listen() {
    const port = process.env.APP_PORT || 3000;

    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('Voyager');
    });

    this.app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  }
}
