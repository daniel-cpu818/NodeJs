import { Repository } from "typeorm";
import { User, UserRole } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";
import bcrypt from "bcryptjs";
import { CreateUserDTO } from "../../../domain/dtos/users/create-user.dto";

export class RegisterUserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async register(data: CreateUserDTO) {
    try {
      const existingUser = await this.repository.findOneBy({ email: data.email.trim().toLowerCase() });
      if (existingUser) {
        throw new Error("El correo electrónico ya está en uso");
      }

      const hashedPassword = await bcrypt.hash(data.password.trim(), 10);
      
      const user = this.repository.create({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: hashedPassword,
        role: UserRole.USER, 
        status: true,
      });

      return await this.repository.save(user);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw new Error("No se pudo registrar el usuario");
    }
  }
}

