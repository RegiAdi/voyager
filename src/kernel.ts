import {Server} from './server';

export class Kernel {
  constructor(private server: Server) {}

  boot() {
    this.server.listen();
  }
}
