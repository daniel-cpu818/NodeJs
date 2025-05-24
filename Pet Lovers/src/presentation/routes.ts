import { Router } from "express";
import { PetPostsRoutes } from "./pet-posts/routes";
import { UserRoutes } from "./users/routes"; 

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Ruta para publicaciones de mascotas
    router.use("/api/", PetPostsRoutes.routes);

    // Ruta para usuarios
    router.use("/api/", UserRoutes.routes);



    return router;
  }
}
