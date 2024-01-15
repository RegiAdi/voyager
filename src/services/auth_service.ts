import {User} from '../models/user';
import {PasswordStatus} from '../password';

interface UserRepository {
  create(user: User): Promise<User>;
  count(user: User): Promise<number>;
  find(user: User): Promise<User>;
  update(user: User): Promise<void>;
  logout(apiToken: string): Promise<boolean>;
}

interface Password {
  hash(password: string | undefined): Promise<string>;
  verify(password: string, passwordHash: string): Promise<PasswordStatus>;
}

interface ApiToken {
  generate(): Promise<string>;
  generateExpirationTime(): Promise<Date>;
}

interface Time {
  now(): Date;
}

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private password: Password,
    private apiToken: ApiToken,
    private time: Time
  ) {}

  async register(user: User): Promise<User> {
    let userCount: number;

    try {
      userCount = await this.userRepository.count(user);

      if (!userCount) {
        const hashedPassword = await this.password.hash(user.password);

        user.password = hashedPassword;
        user.createdAt = this.time.now();
        user.updatedAt = this.time.now();

        const createdUser = await this.userRepository.create(user);

        return createdUser;
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

      if (
        passwordStatus === 'INVALID' ||
        passwordStatus === 'INVALID_UNRECOGNIZED_HASH'
      ) {
        throw new Error("Email and Password didn't match");
      }

      registeredUser.apiToken = await this.apiToken.generate();
      registeredUser.tokenExpiresAt =
        await this.apiToken.generateExpirationTime();
      registeredUser.updatedAt = this.time.now();

      let improvedHash: string;

      if (passwordStatus === 'VALID_NEEDS_REHASH') {
        improvedHash = await this.password.hash(registeredUser.password);

        registeredUser.password = improvedHash;
      }

      await this.userRepository.update(registeredUser);

      return registeredUser!;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error('An error occured');
      }
    }
  }

  async logout(apiToken: string): Promise<boolean> {
    try {
      const loggedOutUser = await this.userRepository.logout(apiToken);

      if (loggedOutUser) {
        return loggedOutUser;
      }

      return false;
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
