import {User} from '../models/user';
import * as MongoDB from 'mongodb';

interface Database {
  getCollection<T extends MongoDB.BSON.Document = MongoDB.BSON.Document>(
    collectionName: string
  ): MongoDB.Collection<T>;
}

export class UserRepository {
  private collection: MongoDB.Collection<User>;

  constructor(private db: Database) {
    this.collection = this.db.getCollection<User>('users');
  }

  async create(user: User): Promise<string> {
    try {
      const result = await this.collection.insertOne(user);

      return result.insertedId?.toString();
    } catch (error) {
      if (error instanceof MongoDB.WriteError) {
        console.log(error.errmsg);
      }

      throw new Error('Failed to create a new user');
    }
  }

  async count(user: User): Promise<number> {
    try {
      const result = await this.collection.countDocuments({email: user.email});

      return result;
    } catch (error) {
      throw new Error('Failed to get user count');
    }
  }
}
