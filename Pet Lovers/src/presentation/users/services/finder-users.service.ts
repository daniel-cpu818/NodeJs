import { Repository } from "typeorm";
import { User } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";

export class FindUsersService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.repository.find();
      return users;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw new Error("No se pudieron obtener los usuarios");
    }
  }
}
