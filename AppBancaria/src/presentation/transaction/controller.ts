import { GetTransactionDetailsService } from "./service/details-transaction.service";
import { GetUserTransactionsService } from "./service/record-transaction.service";
import { TransferService } from "./service/transfer-transaction.service";
import { Request, Response } from "express";


export class TransactionController {
  constructor(
    private getUserTransactionsService: GetUserTransactionsService,
    private getTransactionDetailsService: GetTransactionDetailsService,
    private transferService: TransferService

  ) {}

    async getUserTransactions(req: Request, res: Response) {
        try {
        const userId = req.body.userId 
        const transactions = await this.getUserTransactionsService.execute(userId);
        res.json(transactions);
        } catch (err: any) {
        res.status(500).json({ error: err.message });
        }
    }

    async getTransactionDetails(req: Request, res: Response) {
        try {
        const transactionId = req.params.id; 
        const transaction = await this.getTransactionDetailsService.details(transactionId);
        res.json(transaction);
        } catch (err: any) {
        res.status(500).json({ error: err.message });
        }
    }

    async transfer(req: Request, res: Response) {
        try {
        const { senderId, receiverAccount, amount } = req.body; 
        const transaction = await this.transferService.transfer(senderId, receiverAccount, amount);
        res.status(201).json(transaction);
        } catch (error) {
        res.status(500).json({ error: "err.message" });
        }
    }
}