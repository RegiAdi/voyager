import * as MongoDB from 'mongodb';

export interface Database {
  db: MongoDB.Db;
}

export abstract class BaseRepository {
  protected abstract collection: MongoDB.Collection;

  constructor(protected db: Database) {}

  getCollection<T extends MongoDB.BSON.Document = MongoDB.BSON.Document>(
    collectionName: string
  ): MongoDB.Collection<T> {
    return this.db?.db?.collection<T>(collectionName);
  }
}
