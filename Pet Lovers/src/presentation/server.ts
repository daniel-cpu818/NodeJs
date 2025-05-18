import express, { Router } from "express";

export class Server {
    private app: express.Application;
    private router: Router;
    
    constructor() {
        this.app = express();
        this.router = Router();
    }
    
    public start(port: number): void {
        this.app.use(this.router);
        this.app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        });
    }
    
    public getRouter(): Router {
        return this.router;
    }
    }