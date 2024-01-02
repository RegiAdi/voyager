import {User} from '../models/user';

interface UserRepository {
  create(user: User): Promise<string>;
  count(user: User): Promise<number>;
}

interface Password {
  hash(password: string | undefined): Promise<string>;
}

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private password: Password
  ) {}

  async register(user: User): Promise<User> {
    let userCount: number;

    try {
      userCount = await this.userRepository.count(user);

      if (!userCount) {
        const hashedPassword = await this.password.hash(user.password);
        user.password = hashedPassword;

        const userId = await this.userRepository.create(user);

        return {
          id: userId,
          password: user.password,
        };
      } else {
        throw new Error('Email already exist.');
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error('Failed to create a new user');
      }
    }
  }
}
