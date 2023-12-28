import * as SecurePassword from 'secure-password';

export class Password {
  securePassword: SecurePassword;

  constructor() {
    this.securePassword = new SecurePassword();

    console.log(`PASSWORD_BYTES_MIN: ${SecurePassword.PASSWORD_BYTES_MIN}`);
    console.log(`PASSWORD_BYTES_MAX: ${SecurePassword.PASSWORD_BYTES_MAX}`);
  }
}
