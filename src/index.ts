import {Kernel} from './kernel';
import {Server} from './server';
import {Config} from './config';

const config = new Config();
const server = new Server(config);
const kernel = new Kernel(server);

kernel.boot();
