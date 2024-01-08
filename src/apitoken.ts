import {randomBytes} from 'crypto';

export class ApiToken {
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
}
