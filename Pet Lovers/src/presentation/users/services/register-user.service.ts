import { Repository } from "typeorm";
import { User } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";
import { CreateUserDTO } from "../../domain/dtos/user/create-user.dto";

export class RegisterUserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async register(data: CreateUserDTO): Promise<User> {
    try {
      const existingUser = await this.repository.findOneBy({ email: data.email });
      if (existingUser) {
        throw new Error("El correo electrónico ya está en uso");
      }

      const user = this.repository.create({
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password.trim(), 
      });

      return await this.repository.save(user);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw new Error("No se pudo registrar el usuario");
    }
  }
}
