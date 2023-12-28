import {Kernel} from './kernel';
import {Server} from './server';
import {Database} from './database';
import {Password} from './password';
import {Config} from './config';
import {UserHandler} from './user_handler';

const config = new Config();
const server = new Server();
const db = new Database(config);
const password = new Password();

const userHandler = new UserHandler();

const kernel = new Kernel(config, server, db, userHandler);

kernel.boot();
