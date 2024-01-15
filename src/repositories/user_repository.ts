import {BaseRepository, Database, Cache} from './base_repository';
import {User} from '../models/user';

export class UserRepository extends BaseRepository<User> {
  constructor(
    protected db: Database,
    protected cache: Cache
  ) {
    super(db, 'users', cache);
  }

  async create(user: User): Promise<User> {
    try {
      const result = await this.collection.insertOne(user);

      if (result.insertedId) {
        const createdUser = await this.collection.findOne<User>({
          _id: result.insertedId,
        });

        if (user !== null) {
          await this.cacheClient.setEx(
            `users_${user._id}`,
            3600,
            JSON.stringify(user)
          );
          return createdUser!;
        } else {
          throw new Error('Failed to create a new user');
        }
      } else {
        throw new Error('Failed to create a new user');
      }
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
          $set: user,
        }
      );
    } catch (error) {
      console.error(error);

      throw new Error('Failed to update a user');
    }
  }

  async logout(apiToken: string): Promise<boolean> {
    try {
      const result = await this.collection.updateOne(
        {apiToken: apiToken},
        {
          $set: {
            apiToken: '',
          },
        }
      );

      if (result.modifiedCount) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error('Failed to delete user session');
    }
  }

  async getAuthenticatedUser(apiToken: string): Promise<User> {
    try {
      const user = await this.collection.findOne<User>({apiToken: apiToken});

      if (user === null) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error('An error occured');
      }
    }
  }
}
