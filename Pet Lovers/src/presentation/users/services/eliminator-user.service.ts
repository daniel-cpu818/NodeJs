import { Repository } from "typeorm";
import { User } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";
import { Response } from "express";

export class DeleteUserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async deleteById(id: string, res: Response) {
    if (!id || id.trim() === "" || id === ":id") {
      return res.status(400).json({ message: "El ID es obligatorio" });
    }

    try {
      const user = await this.repository.findOneBy({ id });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      await this.repository.remove(user);
      console.log(`Usuario con ID ${id} eliminado correctamente.`);
      return res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      return res.status(500).json({ message: "No se pudo eliminar el usuario" });
    }
  }
}
