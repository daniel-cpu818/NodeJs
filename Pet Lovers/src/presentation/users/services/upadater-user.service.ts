import { Repository } from "typeorm";
import { User } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";

interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: "user" | "admin";
  status?: boolean;
}

export class UpdateUserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    try {
      const user = await this.repository.findOneBy({ id });

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Actualizar campos si están presentes en el DTO
      if (data.name) user.name = data.name.trim().toLowerCase();
      if (data.email) user.email = data.email.trim().toLowerCase();
      if (data.password) user.password = data.password.trim();
      if (data.role) user.role = data.role;
      if (typeof data.status === "boolean") user.status = data.status;

      await this.repository.save(user);
      console.log("Usuario actualizado con éxito");
      return user;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw new Error("No se pudo actualizar el usuario");
    }
  }
}
