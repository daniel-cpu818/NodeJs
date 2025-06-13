import { Router } from 'express';
import { TransactionController } from './controller';
import { GetTransactionDetailsService } from './service/details-transaction.service';
import { GetUserTransactionsService } from './service/record-transaction.service';
import { TransferService } from './service/transfer-transaction.service';
import { authMiddleware } from '../../common/middlewares/auth';


export class TransactionRoutes {
  static get router(): Router {
    const router = Router();

    const detailsTransactionService = new GetTransactionDetailsService();
    const recordTransactionService = new GetUserTransactionsService();
    const transferTransactionService = new TransferService();

    const controller = new TransactionController(
      recordTransactionService,
      detailsTransactionService,
      transferTransactionService
    );
    router.get('/', authMiddleware, controller.getUserTransactions.bind(controller));
    router.get('/:id', authMiddleware, controller.getTransactionDetails.bind(controller));
    router.post('/transfer', authMiddleware, controller.transfer.bind(controller));
    
    return router;
  }
}