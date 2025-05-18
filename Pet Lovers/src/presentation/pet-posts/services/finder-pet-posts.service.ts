import { AppDataSource } from "../../../config/data-source";
import { PetPost } from "../../../data/postgres/models/pet-post.model";
import { Repository } from "typeorm";

export class FinderPetPostsService {
  private repository: Repository<PetPost>;

  constructor() {
    this.repository = AppDataSource.getRepository(PetPost);
  }

  async findAll(): Promise<PetPost[]> {
    try {
      const posts = await this.repository.find({
        relations: ["user"], // Incluye información del usuario
        order: { created_at: "DESC" },
      });

      return posts;
    } catch (error) {
      console.error("Error al buscar publicaciones:", error);
      throw new Error("Error al buscar publicaciones");
    }
  }

  async findByStatus(status: "pending" | "approved" | "rejected"): Promise<PetPost[]> {
    try {
      const posts = await this.repository.find({
        where: { status },
        relations: ["user"],
        order: { created_at: "DESC" },
      });

      return posts;
    } catch (error) {
      console.error(`Error al buscar publicaciones con estado ${status}:`, error);
      throw new Error("Error al buscar publicaciones por estado");
    }
  }
}
