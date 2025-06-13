import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../../config/data-source';
import { User } from '../../../data/models/user.model';
export class LoginAuthService {
  private userRepo = AppDataSource.getRepository(User);

  async login(email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "6h" });
    return {token, user};
  }
}
