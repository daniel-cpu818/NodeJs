// approve-pet-post.service.ts
import { AppDataSource } from "../../../config/data-source";
import { PetPost } from "../../../data/postgres/models/pet-post.model";
import { User } from "../../../data/postgres/models/user.model";
import { Repository } from "typeorm";

export class ApprovePetPostService {
  private petPostRepo: Repository<PetPost>;
  private userRepository: Repository<User>;

  constructor() {
    this.petPostRepo = AppDataSource.getRepository(PetPost);
    this.userRepository = AppDataSource.getRepository(User);
  }

  async approve(postId: string, adminId: string): Promise<PetPost> {
    const admin = await this.userRepository.findOneBy({ id: adminId });

    if (!admin || admin.role !== 'admin') {
    throw new Error("No autorizado. Solo el administrador puede aprobar publicaciones.");
    }


    const post = await this.petPostRepo.findOneBy({ id: postId });

    if (!post) {
      throw new Error("Publicación no encontrada");
    }

    post.status = 'approved';
    return await this.petPostRepo.save(post);
  }
}
