import BankHelper from "../helpers/bankHelper";

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
export { addBank };
