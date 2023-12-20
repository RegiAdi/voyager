import 'dotenv/config';

export class Config {
  getAppPort(): string {
    return process.env.APP_PORT || '3000';
  }
}
