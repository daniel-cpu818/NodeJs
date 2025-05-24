import { AppDataSource } from "../../../config/data-source";
import { PetPost } from "../../../data/postgres/models/pet-post.model";
import { Repository } from "typeorm";

export class EliminatorPetPostService {
  private repository: Repository<PetPost>;

  constructor() {
    this.repository = AppDataSource.getRepository(PetPost);
  }

  async deleteById(id: string): Promise<{ message: string }> {
    try {
      const petPost = await this.repository.findOneBy({ id });

      if (!petPost) {
        throw new Error("Publicación no encontrada");
      }

      await this.repository.remove(petPost);

      return { message: "Publicación eliminada correctamente" };
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      throw new Error("Error al eliminar la publicación");
    }
  }
}
