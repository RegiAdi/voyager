export interface User {
  id?: string;
  email?: string;
  password?: string;
  fullname?: string;
  phone?: string;
  address?: string;
  apiToken?: string;
  deviceName?: string;
  tokenLastUsedAt?: Date;
  tokenExpiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
