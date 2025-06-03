import { Repository } from "typeorm";
import { User } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";
import { UpdateUserDTO } from "../../../domain/dtos/users/update-user.dto";
import bcrypt from "bcryptjs";

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

      if (data.name != undefined) user.name = data.name.trim().toLowerCase();
      if (data.email != undefined) user.email = data.email.trim().toLowerCase();
      if (data.password != undefined) user.password = await bcrypt.hash(data.password.trim(), 10);
      if (data.role != undefined) user.role = data.role as User["role"];
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
