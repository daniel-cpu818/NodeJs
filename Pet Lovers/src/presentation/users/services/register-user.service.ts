import { Repository } from "typeorm";
import { User, UserRole } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";
import bcrypt from "bcryptjs";
import { CreateUserDTO } from "../../../domain/dtos/users/create-user.dto";
import { Response } from "express";

export class RegisterUserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async register(data: CreateUserDTO, res:Response ): Promise<User> {
    try {
      
      if (!data.name || !data.email || !data.password) {
        res.status(400).json({ message: "Todos los campos son obligatorios" });
        throw new Error("Faltan campos obligatorios");
      }
      const existingUser = await this.repository.findOneBy({ email: data.email.trim().toLowerCase() });
      if (existingUser) {
        res.status(400).json({ message: "El correo electrónico ya está en uso" });
        throw new Error("El correo electrónico ya está en uso");
      }
      const hashedPassword = await bcrypt.hash(data.password.trim(), 10);

      const user = new User();
      user.name = data.name.trim();
      user.email = data.email.trim().toLowerCase();
      user.password = hashedPassword;
      user.role = UserRole.USER;
      user.status = true;
      user.created_at = new Date();


      
      this.repository.create(user);

      return await this.repository.save(user);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw new Error("No se pudo registrar el usuario");
    }
  }
}

