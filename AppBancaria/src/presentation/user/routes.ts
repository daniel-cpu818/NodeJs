import { Router } from "express";
import { GetUserService } from "./service/getUser-user.service";
import { getUserController } from "./controller";
import { authMiddleware } from "../../common/middlewares/auth";

export class UserRoutes {
  static get router(): Router {
    const router = Router();

    const getUserService = new GetUserService();
    const controller = new getUserController(getUserService);

    router.get("/me", authMiddleware, controller.getUser.bind(controller));

    return router;
  }
}