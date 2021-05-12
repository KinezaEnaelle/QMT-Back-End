import AccountHelper from "../helpers/accountHelper";

const addAccount = async (req, res) => {
  const { accountName, accountNumber, pin, userId, amount } = req.body;
  const account = { accountName, accountNumber, pin, userId, amount};
  const createAccount = await AccountHelper.saveAccount(account);
  if (createAccount) {
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
export { addAccount };
