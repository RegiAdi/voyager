import * as express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app: express.Express = express();
const port = process.env.APP_PORT || 3000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
