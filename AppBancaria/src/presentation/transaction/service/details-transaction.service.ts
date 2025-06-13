import { AppDataSource } from "../../../config/data-source";
import { Transaction } from "../../../data/models/transaction.model";

export class GetTransactionDetailsService {
  private txRepo = AppDataSource.getRepository(Transaction);

  async details(transactionId: string): Promise<Transaction> {
    const transaction = await this.txRepo.findOne({
      where: { id: transactionId },
      relations: ['sender', 'receiver'],
    });

    if (!transaction) {
      throw new Error('Transacción no encontrada');
    }

    return transaction;
  }
}
