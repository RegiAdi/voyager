interface Server {
  listen(): void;
}

export class Kernel {
  constructor(private server: Server) {}

  boot() {
    this.server.listen();
  }
}
