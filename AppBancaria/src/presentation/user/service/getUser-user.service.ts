import { AppDataSource } from "../../../config/data-source";
import { User } from "../../../data/models/user.model";

export class GetUserService {
  private userRepo = AppDataSource.getRepository(User);

  async getUser(userId: string): Promise<Omit<User, "password">> {
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

       const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
