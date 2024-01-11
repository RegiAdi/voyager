import {createClient, RedisClientType} from 'redis';

export class Cache {
  client: RedisClientType;

  constructor() {
    this.client = createClient();
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
