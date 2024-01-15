import * as MongoDB from 'mongodb';
import {RedisClientType} from 'redis';

export interface Database {
  db: MongoDB.Db;
}

export interface Cache {
  client: RedisClientType;
}

export abstract class BaseRepository<
  T extends MongoDB.BSON.Document = MongoDB.BSON.Document,
> {
  protected collection: MongoDB.Collection<T>;
  protected cacheClient: RedisClientType;

  constructor(
    protected db: Database,
    protected collectionName: string,
    protected cache: Cache
  ) {
    this.collection = this.getCollection<T>(collectionName);
    this.cacheClient = this.cache.client;
  }

  getCollection<T extends MongoDB.BSON.Document = MongoDB.BSON.Document>(
    collectionName: string
  ): MongoDB.Collection<T> {
    return this.db?.db?.collection<T>(collectionName);
  }
}
