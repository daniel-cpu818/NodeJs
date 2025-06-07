import express, { Application, Router } from "express";

interface ServerOptions {
  port: number;
  routes: Router;
}

export class Server {
  private readonly app: Application;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    this.app = express();
    this.port = options.port;
    this.routes = options.routes;

    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware() {
    this.app.use(express.json()); 
  }

  private configureRoutes() {
    this.app.use(this.routes);
  }

  public async start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}