import 'dotenv/config';

export class Config {
  getAppPort() {
    return process.env.APP_PORT || 3000;
  }
}
