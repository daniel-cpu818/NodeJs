import { Router } from "express";
import { PetPostsRoutes } from "./pet-posts/routes";
export class AppRoutes {
 static get routes(): Router {
    const router = Router();
    router.use("/pet-posts", PetPostsRoutes.routes);
    return router;
 }
}