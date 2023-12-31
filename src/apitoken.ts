import {randomBytes} from 'crypto';

interface Config {
  getApiTokenDuration(): number;
}

interface Time {
  now(): Date;
  addDays(date: Date, amount: number): Date;
  isAfter(date: Date, dateToCompare: Date): boolean;
}

export class ApiToken {
  constructor(
    private config: Config,
    private time: Time
  ) {}

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
    return this.time.addDays(new Date(), this.config.getApiTokenDuration());
  }

  async isExpired(expirationTime: Date): Promise<boolean> {
    return !this.time.isAfter(expirationTime, this.time.now());
  }
}
