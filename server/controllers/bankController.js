import BankHelper from "../helpers/bankHelper";
import AccountHelper from '../helpers/accountHelper';

const addBank = async (req, res) => {
  const { name, location } = req.body;
  const bank = { name, location };
  const createBank = await BankHelper.saveBank(bank);
  if (createBank) {
    return res.status(201).json({
      status: 201,
      message: "Successfully Created",
    });
  }
  return res.status(400).json({
    status: 400,
    error: "Bad request",
  });
};

const validateAccount = async (req, res) => {
  const { accountNumber, pin } = req.body;
  const bankId = req.params.id;
  const { id, country } = req.user;
  try {
    const bankInfo = await BankHelper.bankExists('id', bankId);
    if(bankInfo){
      if(bankInfo.location === country) {
        const updatedAccount = await AccountHelper.updateUserId(id, accountNumber);
        if(updatedAccount) {
          console.log(updatedAccount);
          return res.status(201).json({
            status: 201,
            message: "Account Successfully Updated",
          });
        } else {
          return res.status(500).json({
            status: 500,
            error: "Account info not updated",
          });
        }
      } else {
        return res.status(400).json({
          status: 400,
          error: "The selected bank was not found in your country.",
        });
      }
    } else {
      return res.status(404).json({
        status: 404,
        error: "Bank not found.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      error: "Bad request",
    });
  }
};

export { addBank, validateAccount };
