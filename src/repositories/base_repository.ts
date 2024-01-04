import * as MongoDB from 'mongodb';

export interface Database {
  db: MongoDB.Db;
}

export abstract class BaseRepository<
  T extends MongoDB.BSON.Document = MongoDB.BSON.Document,
> {
  protected collection: MongoDB.Collection<T>;

  constructor(
    protected db: Database,
    protected collectionName: string
  ) {
    this.collection = this.getCollection<T>(collectionName);
  }

  getCollection<T extends MongoDB.BSON.Document = MongoDB.BSON.Document>(
    collectionName: string
  ): MongoDB.Collection<T> {
    return this.db?.db?.collection<T>(collectionName);
  }
}
