import {User} from '../models/user';

interface UserRepository {
  create(user: User): Promise<string>;
  count(user: User): Promise<number>;
}

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(user: User): Promise<User> {
    let userCount: number;

    try {
      userCount = await this.userRepository.count(user);
    } catch (error) {
      throw new Error('Failed to create a new user');
    }

    let userId: string;

    if (!userCount) {
      try {
        userId = await this.userRepository.create(user);

        return {
          id: userId,
        };
      } catch (error) {
        throw new Error('Failed to create a new user');
      }
    } else {
      throw new Error('Email already exist');
    }
  }
}
