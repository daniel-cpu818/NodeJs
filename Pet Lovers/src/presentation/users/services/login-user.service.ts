import { Repository } from "typeorm";
import bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";
import { User } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";
import { env } from "../../../config/envs";
import { Response } from "express";

interface LoginDTO {
  email: string;
  password: string;
}

export class LoginUserService {
  private repository: Repository<User>;
  

  constructor() {
    
    this.repository = AppDataSource.getRepository(User);


  }

  async login(data: LoginDTO, res:Response): Promise<{ token: string; user: Partial<User> }> {
    try {
      const user = await this.repository.findOneBy({ email: data.email.toLowerCase().trim() });

      if (!user) {
        res.status(401).json({ message: "El correo no existe" });
        throw new Error("Credenciales incorrectas");
      }

      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Credenciales incorrectas" });
        throw new Error("Credenciales incorrectas");
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      // Generar JWT
      const token = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: "1h", 
      });

      const { password, ...userWithoutPassword } = user;

      return {
        token,
        user: userWithoutPassword,
      };
    } catch (error) {
      console.error("Error en el login:", error);
      throw new Error("Credenciales inválidas o usuario no encontrado");
    }
  }
}
