import { Router } from 'express';
import { AuthRoutes } from './auths/routes';
import { UserRoutes } from './user/routes';
import { TransactionRoutes } from './transaction/routes';

const router = Router();

router.use('/api/auth', AuthRoutes.router);
router.use('/api/users', UserRoutes.router);
router.use('/api/transactions', TransactionRoutes.router);

export default router;
