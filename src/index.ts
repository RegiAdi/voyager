import {Kernel} from './kernel';
import {Server} from './server';
import {Config} from './config';

const config = new Config();
const server = new Server();
const kernel = new Kernel(config, server);

kernel.boot();
