import * as MongoDB from 'mongodb';
import {User} from './models/user';

interface Config {
  getMongoUri(): string;
  getMongoDbName(): string;
}

export class Database {
  private name: string;
  private uri: string;
  private db: MongoDB.Db;
  private client: null | MongoDB.MongoClient;

  constructor(private config: Config) {
    this.name = this.config.getMongoDbName();
    this.uri = this.config.getMongoUri();
    this.client = new MongoDB.MongoClient(this.uri);
    this.db = this.client.db(this.name);
  }

  async connect(): Promise<void> {
    await this.client?.connect();

    console.log(`Successfully connected to database: ${this.db.databaseName}`);
  }

  getCollection<T extends MongoDB.BSON.Document = MongoDB.BSON.Document>(
    collectionName: string
  ): MongoDB.Collection<T> {
    return this.db?.collection<T>(collectionName);
  }
}
