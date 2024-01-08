import {BaseRepository, Database} from './base_repository';
import {User} from '../models/user';

export class UserRepository extends BaseRepository<User> {
  constructor(protected db: Database) {
    super(db, 'users');
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

  async find(user: User): Promise<User> {
    try {
      const registeredUser = await this.collection.findOne<User>({
        email: user.email,
      });

      if (registeredUser === null) {
        throw new Error('User not found');
      }

      return registeredUser;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error('An error occured');
      }
    }
  }

  async update(user: User): Promise<void> {
    try {
      await this.collection.updateOne(
        {email: user.email},
        {
          $set: {
            apiToken: user.apiToken,
          },
        }
      );
    } catch (error) {
      console.error(error);

      throw new Error('Failed to update a user');
    }
  }
}
