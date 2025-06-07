import { Repository } from "typeorm";
import { User } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";
import { Response } from "express";

export class FindUserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findById(id: string, res: Response): Promise<User | null> {
    try {
      const user = await this.repository.findOne({ where: { id } });
      return user;
    } catch (error) {
      res.status(404).json({ message: "El id: " + id + " no existe" });
      throw new Error("No se pudo buscar el usuario");
    }
  }
}
