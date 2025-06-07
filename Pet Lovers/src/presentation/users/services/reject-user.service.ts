// reject-pet-post.service.ts
import { AppDataSource } from "../../../config/data-source";
import { PetPost } from "../../../data/postgres/models/pet-post.model";
import { User } from "../../../data/postgres/models/user.model";
import { Repository } from "typeorm";

export class RejectPetPostService {
  private petPostRepo: Repository<PetPost>;
  private userRepo: Repository<User>;

  constructor() {
    this.petPostRepo = AppDataSource.getRepository(PetPost);
    this.userRepo = AppDataSource.getRepository(User);
  }

  async reject(postId: string, adminId: string): Promise<PetPost> {
    const admin = await this.userRepo.findOneBy({ id: adminId });

    if (!admin || admin.role !== 'admin') {
      throw new Error("Acceso denegado. Solo administradores pueden rechazar publicaciones.");
    }

    const post = await this.petPostRepo.findOneBy({ id: postId });

    if (!post) {
      throw new Error("Publicación no encontrada");
    }

    post.status = 'rejected';
    return await this.petPostRepo.save(post);
  }
}
