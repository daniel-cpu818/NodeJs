import { Repository } from "typeorm";
import { User } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";

export class DeleteUserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async deleteById(id: string) {
    try {
      const user = await this.repository.findOneBy({ id });

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      await this.repository.remove(user);
      console.log(`Usuario con ID ${id} eliminado correctamente.`);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw new Error("No se pudo eliminar el usuario");
    }
  }
}
