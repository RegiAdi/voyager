import 'dotenv/config';

export class Config {
  getAppPort(): string {
    return process.env.APP_PORT || '3000';
  }

  getMongoUri(): string {
    return process.env.MONGO_URI || 'mongodb://localhost:27017/';
  }

  getMongoDbName(): string {
    return process.env.MONGO_DB_NAME || 'voyager';
  }

  getBaseUrlPath(): string {
    return '/api/v1';
  }

  getApiTokenDuration(): number {
    const duration = process.env.APITOKEN_DURATION_DAYS;

    if (duration !== undefined) {
      return parseInt(duration);
    }

    return 60;
  }
}
