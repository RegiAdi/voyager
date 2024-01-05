import {User} from '../models/user';
import {PasswordStatus} from '../password';

interface UserRepository {
  create(user: User): Promise<string>;
  count(user: User): Promise<number>;
  find(user: User): Promise<User>;
}

interface Password {
  hash(password: string | undefined): Promise<string>;
  verify(password: string, passwordHash: string): Promise<PasswordStatus>;
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
        user.createdAt = new Date();
        user.updatedAt = new Date();

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

  async login(user: User): Promise<User> {
    try {
      const registeredUser = await this.userRepository.find(user);

      if (registeredUser === null) {
        throw new Error('User not found');
      }

      const passwordStatus = await this.password.verify(
        user.password!,
        registeredUser.password!
      );

      if (passwordStatus === 'VALID') {
        return registeredUser!;
      } else {
        throw new Error("Email and Password didn't match");
      }
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
