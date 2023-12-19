import {Kernel} from './kernel';
import {Server} from './server';

const kernel = new Kernel(new Server());

kernel.boot();
