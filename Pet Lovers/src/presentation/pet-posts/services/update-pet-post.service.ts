import { AppDataSource } from "../../../config/data-source";
import { PetPost } from "../../../data/postgres/models/pet-post.model";
import { Repository } from "typeorm";

interface UpdatePetPostDTO {
  pet_name?: string;
  description?: string;
  image_url?: string;
  status?: "pending" | "approved" | "rejected";
  hasFounded?: boolean;
}

export class UpdatePetPostService {
  private repository: Repository<PetPost>;

  constructor() {
    this.repository = AppDataSource.getRepository(PetPost);
  }

  async update(id: string, data: UpdatePetPostDTO): Promise<PetPost | null> {
    try {
      const petPost = await this.repository.findOneBy({ id });

      if (!petPost) return null;

      if (data.pet_name !== undefined) petPost.pet_name = data.pet_name.trim();
      if (data.description !== undefined) petPost.description = data.description.trim();
      if (data.image_url !== undefined) petPost.image_url = data.image_url;
      if (data.status !== undefined) petPost.status = data.status;
      if (data.hasFounded !== undefined) petPost.hasFounded = data.hasFounded;

      await this.repository.save(petPost);
      return petPost;
    } catch (error) {
      console.error("Error al actualizar la publicación de mascota:", error);
      throw new Error("Error al actualizar la publicación de mascota");
    }
  }
}
