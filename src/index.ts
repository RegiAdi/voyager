import {Kernel} from './kernel';
import {Server} from './server';
import {Database} from './database';
import {Password} from './password';
import {ApiToken} from './apitoken';
import {Config} from './config';

import {AuthService} from './services/auth_service';

import {AuthHandler} from './handlers/auth_handler';
import {UserHandler} from './handlers/user_handler';

import {UserRepository} from './repositories/user_repository';
import {Time} from './time';
import {AuthMiddleware} from './middleware/auth_middleware';

const config = new Config();
const server = new Server();
const db = new Database(config);
const password = new Password();
const time = new Time();
const apiToken = new ApiToken(config, time);

const userRepository = new UserRepository(db);

const authMiddleware = new AuthMiddleware(userRepository, apiToken);

const authService = new AuthService(userRepository, password, apiToken, time);

const authHandler = new AuthHandler(authService);
const userHandler = new UserHandler();

const kernel = new Kernel(
  config,
  server,
  db,
  authMiddleware,
  authHandler,
  userHandler
);

(async () => {
  await kernel.boot();
})();
