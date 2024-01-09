import {Request, Response, NextFunction} from 'express';
import {BaseHandler} from '../handlers/base_handler';
import {User} from '../models/user';

interface UserRepository {
  getAuthenticatedUser(apiToken: string): Promise<User>;
}

interface ApiToken {
  isExpired(expirationTime: Date): Promise<boolean>;
}

export class AuthMiddleware extends BaseHandler {
  constructor(
    private userRepository: UserRepository,
    private apiToken: ApiToken
  ) {
    super();
  }

  async mount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const apiToken = req.get('Authorization');

      if (apiToken === undefined || apiToken === '') {
        this.send(res, {
          statusCode: 401,
          status: 'error',
          message: 'Unauthorized access',
          data: null,
        });

        return;
      }

      const user = await this.getAuthenticatedUser(apiToken!);
      const isTokenExpired = await this.apiToken.isExpired(
        user.tokenExpiresAt!
      );

      if (isTokenExpired) {
        this.send(res, {
          statusCode: 401,
          status: 'error',
          message: 'API Token expired',
          data: null,
        });

        return;
      }

      next();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        this.send(res, {
          statusCode: 401,
          status: 'error',
          message: error.message,
          data: null,
        });

        return;
      } else {
        this.send(res, {
          statusCode: 401,
          status: 'error',
          message: 'Unauthorized access',
          data: null,
        });

        return;
      }
    }
  }

  private async getAuthenticatedUser(apiToken: string): Promise<User> {
    try {
      const user = await this.userRepository.getAuthenticatedUser(apiToken);

      return user;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error('Unauthorized access');
      }
    }
  }
}
