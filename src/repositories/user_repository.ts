import {BaseRepository, Database} from './base_repository';
import {User} from '../models/user';
import * as MongoDB from 'mongodb';

export class UserRepository extends BaseRepository {
  protected collection: MongoDB.Collection;

  constructor(protected db: Database) {
    super(db);
    this.collection = this.getCollection<User>('users');
  }

  async create(user: User): Promise<string> {
    try {
      const result = await this.collection.insertOne(user);

      return result.insertedId?.toString();
    } catch (error) {
      console.error(error);

      throw new Error('Failed to create a new user');
    }
  }

  async count(user: User): Promise<number> {
    try {
      const result = await this.collection.countDocuments({email: user.email});

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to get user count');
    }
  }
}
