import { Repository } from "typeorm";
import { User } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";

export class FindUserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.repository.findOne({ where: { id } });
      return user;
    } catch (error) {
      console.error("Error al buscar el usuario por ID:", error);
      throw new Error("No se pudo buscar el usuario");
    }
  }
}
