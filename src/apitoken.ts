import {randomBytes} from 'crypto';
import {addDays} from 'date-fns';

interface Config {
  getApiTokenDuration(): number;
}

export class ApiToken {
  constructor(private config: Config) {}

  private generateRandomByte(length: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      randomBytes(length, (error, buffer) => {
        if (error) {
          return reject(error);
        }

        resolve(buffer);
      });
    });
  }

  async generate(): Promise<string> {
    try {
      const tokenBuffer = await this.generateRandomByte(32);

      return tokenBuffer.toString('base64url');
    } catch (error) {
      console.error(error);

      throw new Error('Failed to generate API Token');
    }
  }

  async generateExpirationTime(): Promise<Date> {
    return addDays(new Date(), this.config.getApiTokenDuration());
  }
}
