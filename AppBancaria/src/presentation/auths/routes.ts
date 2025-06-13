import { Router } from 'express';
import { RegisterAuthService } from './service/register-auth.service';
import { LoginAuthService } from './service/login-auth.service';
import { AuthController } from './contoller';

export class AuthRoutes {
  static get router(): Router {
    const router = Router();

    const loginService = new LoginAuthService();
    const registerService = new RegisterAuthService();
    
    const controller = new AuthController(
        loginService,
        registerService
    );
    router.post('/login', controller.login.bind(controller));
    router.post('/register', controller.register.bind(controller));
    return router;
  }
}