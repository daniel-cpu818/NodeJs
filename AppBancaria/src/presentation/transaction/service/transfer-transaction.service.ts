import { AppDataSource } from "../../../config/data-source";
import { User } from "../../../data/models/user.model";
import { Transaction } from "../../../data/models/transaction.model";
import { sendTransferEmail } from "../../../utils/mailer";

export class TransferService {
  private userRepo = AppDataSource.getRepository(User);
  private txRepo = AppDataSource.getRepository(Transaction);

  async transfer(senderId: string, receiverAccount: string, amount: number): Promise<Transaction> {
    const sender = await this.userRepo.findOneBy({ id: senderId });
    const receiver = await this.userRepo.findOneBy({ account_number: receiverAccount });

    if (!sender || !receiver) {
      throw new Error("Usuario no encontrado");
    }

    if (sender.id === receiver.id) {
      throw new Error("No puedes transferirte a ti mismo");
    }

    if (sender.balance < amount) {
      throw new Error("Fondos insuficientes");
    }

    sender.balance -= amount;
    receiver.balance += amount;

    const transaction = this.txRepo.create({ sender, receiver, amount });
    await AppDataSource.manager.save([sender, receiver, transaction]);

    await sendTransferEmail(receiver.email, amount, sender.name);

    return transaction;
  }
}
