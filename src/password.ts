import * as SecurePassword from 'secure-password';

export type PasswordStatus =
  | 'INVALID_UNRECOGNIZED_HASH'
  | 'INVALID'
  | 'VALID'
  | 'VALID_NEEDS_REHASH';

export class Password {
  private securePassword: SecurePassword;

  constructor() {
    this.securePassword = new SecurePassword();
  }

  async hash(password: string): Promise<string> {
    const userPassword = Buffer.from(password);
    const hash = await this.securePassword.hash(userPassword);

    return this.bufferToString(hash);
  }

  async verify(
    password: string,
    passwordHash: string
  ): Promise<PasswordStatus> {
    const passwordHashBuffer = Buffer.alloc(SecurePassword.HASH_BYTES);
    passwordHashBuffer.write(passwordHash);

    const result = await this.securePassword.verify(
      Buffer.from(password),
      passwordHashBuffer
    );

    switch (result) {
      case SecurePassword.INVALID_UNRECOGNIZED_HASH:
        console.error(
          'This hash was not made with secure-password. Attempt legacy algorithm'
        );

        return 'INVALID_UNRECOGNIZED_HASH';
      case SecurePassword.INVALID:
        console.log('Invalid password');

        return 'INVALID';
      case SecurePassword.VALID:
        console.log('Authenticated');

        return 'VALID';
      case SecurePassword.VALID_NEEDS_REHASH:
        console.log('Yay you made it, wait for us to improve your safety');

        return 'VALID_NEEDS_REHASH';
    }
  }

  private bufferToString(password: Buffer) {
    return password.toString('utf8').replace(/\0/g, '');
  }
}
