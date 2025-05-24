import { Repository } from "typeorm";
import { PetPost } from "../../../data/postgres/models/pet-post.model";
import { User } from "../../../data/postgres/models/user.model";
import { AppDataSource } from "../../../config/data-source";

interface CreatePetPostDTO {
  pet_name: string;
  description: string;
  image_url: string;
  user_id: string;
}

export class CreatorPetPostService {
    
    private petPostRepository: Repository<PetPost>;
    private userRepository: Repository<User>;
    
   constructor() {
    this.petPostRepository = AppDataSource.getRepository(PetPost);
    this.userRepository = AppDataSource.getRepository(User);
  }
  async createPet(data: CreatePetPostDTO, userId: string): Promise<PetPost> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId});
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const petPost = new PetPost();
      petPost.pet_name = data.pet_name.trim();
      petPost.description = data.description.trim();
      petPost.image_url = data.image_url.trim();
      petPost.user = user;

      await this.petPostRepository.save(petPost);

      console.log("Publicación de mascota creada con éxito");
      return petPost;
    } catch (error) {
      console.error("Error al crear la publicación de mascota:", error);
      throw new Error("Error al crear la publicación de mascota");
    }
  }
}
