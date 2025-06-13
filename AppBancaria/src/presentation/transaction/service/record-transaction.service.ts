import { AppDataSource } from "../../../config/data-source";
import { Transaction } from "../../../data/models/transaction.model";

export class GetUserTransactionsService {
  private txRepo = AppDataSource.getRepository(Transaction);

  async execute(userId: string): Promise<Transaction[]> {
    return await this.txRepo.find({
      where: [
        { sender: { id: userId } },
        { receiver: { id: userId } },
      ],
      relations: ['sender', 'receiver'],
      order: { transaction_date: 'DESC' },
    });
  }
}
