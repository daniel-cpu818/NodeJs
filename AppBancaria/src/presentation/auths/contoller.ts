import { Request, Response } from 'express';
import { RegisterAuthService } from './service/register-auth.service';
import { LoginAuthService } from './service/login-auth.service';

export class AuthController {
  constructor(
    private loginService: LoginAuthService,
    private registerService: RegisterAuthService
  ) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
        return 
      }

      const token = await this.loginService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: 'Error de autenticaciónn' });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

    //   if (!name || !email || !password) {
    //     res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    //     return;
    //   }

      const user = await this.registerService.register(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Error al registrar usuario' });
    }
  }
}
