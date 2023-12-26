import * as mongoDb from 'mongodb';

interface Config {
  getMongoUri(): string;
  getMongoDbName(): string;
}

export class Database {
  name: string;
  uri: string;

  constructor(private config: Config) {
    this.name = this.config.getMongoDbName();
    this.uri = this.config.getMongoUri();
  }

  async connect(): Promise<void> {
    const mongoClient: mongoDb.MongoClient = new mongoDb.MongoClient(this.uri);

    await mongoClient.connect();

    const db: mongoDb.Db = mongoClient.db(this.name);

    console.log(`Successfully connected to database: ${db.databaseName}`);
  }
}
