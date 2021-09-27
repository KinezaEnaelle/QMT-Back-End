import Router from "express";
import {viewTransaction} from '../controllers/transactionsController';

const router = Router();

router.get('/transaction/viewTransaction', viewTransaction);

export default router;
