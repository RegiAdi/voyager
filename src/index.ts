import {Kernel} from './kernel';
import {Server} from './server';
import {Config} from './config';
import {UserHandler} from './user_handler';

const config = new Config();
const server = new Server();

const userHandler = new UserHandler();

const kernel = new Kernel(config, server, userHandler);

kernel.boot();
