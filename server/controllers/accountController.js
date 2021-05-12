import AccountHelper from "../helpers/accountHelper";

const addAccount = async (req, res) => {
  const { accountName, accountNumber, pin, userId, amount } = req.body;
  const accountNumberExists = await AccountHelper.accountExists(
    "accountNumber",
    req.body.accountNumber
  );
  if (accountNumberExists) {
    return res.status(200).json({
      status: 200,
      message: "Successfully Created",
    });
  }
  const account = {
    accountName,
    accountNumber,
    pin,
    userId,
    amount,
  };
  return res.status(400).json({
    status: 400,
    error: "Bad request",
  });
};
return { addAccount };
