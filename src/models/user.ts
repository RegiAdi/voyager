import {ObjectId} from 'mongodb';

export interface User {
  id?: ObjectId;
  email?: string;
  password?: string;
  fullname?: string;
  phone?: string;
  address?: string;
  apiToken?: string;
  deviceName?: string;
  tokenLastUsedAt?: string;
  tokenExpiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
