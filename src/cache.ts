import {createClient, RedisClientType} from 'redis';

interface Config {
  getRedisHost(): string;
  getRedisPort(): number;
}

export class Cache {
  client: RedisClientType;

  constructor(private config: Config) {
    this.client = createClient({
      socket: {
        port: this.config.getRedisPort(),
        host: this.config.getRedisHost(),
      },
    });
  }

  async connect(): Promise<void> {
    await this.client
      .on('connect', () => console.log('Redis connected'))
      .on('reconnecting', () => console.log('Redis reconnecting'))
      .on('ready', () => {
        console.log('Redis ready!');
      })
      .on('error', err => console.error('Redis Client Error', err))
      .connect();
  }
}
