import {Kernel} from './kernel';
import {Server} from './server';
import {Database} from './database';
import {Password} from './password';
import {Config} from './config';

import {AuthService} from './services/auth_service';

import {AuthHandler} from './handlers/auth_handler';
import {UserHandler} from './handlers/user_handler';
import {UserRepository} from './repositories/user_repository';

const config = new Config();
const server = new Server();
const db = new Database(config);
const password = new Password();

const userRepository = new UserRepository(db);

const authService = new AuthService(userRepository, password);

const authHandler = new AuthHandler(authService);
const userHandler = new UserHandler();

const kernel = new Kernel(config, server, db, authHandler, userHandler);

kernel.boot();
