import { Router } from "express";
import { UserController } from "./controller";
import { RegisterUserService } from "./services/register-user.service";
import { FindUserService } from "./services/finder-user.service";
import { FindUsersService } from "./services/finder-users.service";
import { DeleteUserService } from "./services/eliminator-user.service";
import { UpdateUserService } from "./services/upadater-user.service";
import { LoginUserService } from "./services/login-user.service";
import { RejectPetPostService } from "./services/reject-user.service";
import { ApprovePetPostService } from "./services/approve-user.service";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    // Services
    const registerUserService = new RegisterUserService();
    const findUserService = new FindUserService();
    const findUsersService = new FindUsersService();
    const deleteUserService = new DeleteUserService();
    const updateUserService = new UpdateUserService();
    const loginUserService = new LoginUserService();
    const approveUserService = new ApprovePetPostService();
    const rejectUserService = new RejectPetPostService();
    
    // Controllers
    const controller = new UserController(
      registerUserService,
      findUserService,
      findUsersService,
      deleteUserService,
      updateUserService,
      loginUserService,
      approveUserService,
      rejectUserService
    );
    // Routes
    router.post("/users", controller.registerUser.bind(controller));
    router.get("/users/:id", controller.findUserById.bind(controller));
    router.get("/users", controller.findAllUsers.bind(controller));
    router.delete("/users/:id", controller.deleteUser.bind(controller));
    router.put("/users/:id", controller.updateUser.bind(controller));
    router.post("/login", controller.loginUser.bind(controller));
    router.put("/users/:id/approve", controller.approveUser.bind(controller));
    router.put("/users/:id/reject", controller.rejectUser.bind(controller));


    return router;
  }
}