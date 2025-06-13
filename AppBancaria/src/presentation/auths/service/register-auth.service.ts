import bcrypt from 'bcrypt';
import { User } from '../../../data/models/user.model';
import { AppDataSource } from '../../../config/data-source';
import { sendWelcomeEmail } from '../../../utils/mailer';

export class RegisterAuthService {
  private userRepo = AppDataSource.getRepository(User);

  async register(name: string, email: string, password: string) {
    // Validación básica
    if (!name || !email || !password) {
      throw new Error('Todos los campos son obligatorios');
    }

    const exists = await this.userRepo.findOneBy({ email });
    if (exists) throw new Error('Email ya registrado');

    const hashed = await bcrypt.hash(password, 10);
    const account_number = await this.generateUniqueAccountNumber();

    const user = this.userRepo.create({ name, email, password: hashed, account_number });
    await this.userRepo.save(user);

    try {
      await sendWelcomeEmail(email, name, account_number);
    } catch (error) {
      console.error('❌ Error enviando correo de bienvenida:', error);
      // Opcional: puedes decidir si lanzar error o continuar
      // throw new Error('Usuario creado, pero falló el envío del correo');
    }

    return user;
  }

  /**
   * Genera un número de cuenta único y no repetido
   */
  private async generateUniqueAccountNumber(): Promise<string> {
    let account_number: string;
    let exists: User | null;

    do {
      account_number = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      exists = await this.userRepo.findOneBy({ account_number });
    } while (exists);

    return account_number;
  }
}
