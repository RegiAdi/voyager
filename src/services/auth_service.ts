import {User} from '../models/user';

interface UserRepository {
  create(user: User): Promise<string>;
}

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(user: User): Promise<string> {
    let userId: string;

    try {
      userId = await this.userRepository.create(user);
    } catch (error) {
      throw new Error('Failed to create a new user');
    }

    return userId;
  }
}
