import * as MongoDB from 'mongodb';

interface Config {
  getMongoUri(): string;
  getMongoDbName(): string;
}

export class Database {
  private name: string;
  private uri: string;
  db: MongoDB.Db;
  client: null | MongoDB.MongoClient;

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
}
