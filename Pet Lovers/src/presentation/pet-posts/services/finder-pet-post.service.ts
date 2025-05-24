import { AppDataSource } from "../../../config/data-source";
import { PetPost } from "../../../data/postgres/models/pet-post.model";
import { Repository } from "typeorm";

export class FinderPetPostService {
  private repository: Repository<PetPost>;

  constructor() {
    this.repository = AppDataSource.getRepository(PetPost);
  }


  async findById(id: string): Promise<PetPost> {
    try {
      const petPost = await this.repository.findOne({
        where: { id },
        relations: ["user"],
      });

      if (!petPost) throw new Error("Publicación no encontrada");

      return petPost;
    } catch (error) {
      console.error("Error al obtener la publicación:", error);
      throw new Error("Error al obtener la publicación");
    }
  }
}
