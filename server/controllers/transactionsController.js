import TransactionHelper from "../helpers/transactionHelper";
import models from '../models';

const { Transaction } = models;
const viewTransaction = async (req, res) => {
    const allTransactions = await Transaction.findAll();
    if(allTransactions.length === 0){
      return res.status(404).json({
        status: 404,
        error: 'Transactions not found',
      });
    }
    res.status(200).json({
      status: 200,
      data: allTransactions
    });
  }
  export {viewTransaction};