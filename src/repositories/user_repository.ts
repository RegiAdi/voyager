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

        if (createdUser !== null) {
          await this.cacheClient.setEx(
            `users_${createdUser.email}`,
            3600,
            JSON.stringify(createdUser)
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
      const cachedUser = await this.cacheClient.get(`users_${user.email}`);

      if (cachedUser !== null) {
        return JSON.parse(cachedUser);
      }

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

  async update(user: User): Promise<User> {
    try {
      const updatedUser = await this.collection.findOneAndUpdate(
        {email: user.email},
        {
          $set: user,
        },
        {
          returnDocument: 'after',
        }
      );

      if (updatedUser !== null) {
        await this.cacheClient.setEx(
          `users_${updatedUser.email}`,
          3600,
          JSON.stringify(updatedUser)
        );

        await this.cacheClient.setEx(
          `user_sessions_${updatedUser.apiToken}`,
          3600,
          JSON.stringify(updatedUser)
        );

        return updatedUser!;
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error(error);

      throw new Error('Failed to update a user');
    }
  }

  async logout(apiToken: string): Promise<boolean> {
    try {
      const updatedUser = await this.collection.findOneAndUpdate(
        {apiToken: apiToken},
        {
          $set: {
            apiToken: '',
          },
        },
        {
          returnDocument: 'after',
        }
      );

      if (updatedUser !== null) {
        await this.cacheClient.del(`users_${updatedUser.email}`);
        await this.cacheClient.del(`user_sessions_${apiToken}`);

        return true;
      }

      return false;
    } catch (error) {
      throw new Error('Failed to delete user session');
    }
  }

  async getAuthenticatedUser(apiToken: string): Promise<User> {
    try {
      const userSession = await this.cacheClient.get(
        `user_sessions_${apiToken}`
      );

      console.log(`userSession: ${userSession}`);

      if (userSession !== null) {
        return JSON.parse(userSession);
      }

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
