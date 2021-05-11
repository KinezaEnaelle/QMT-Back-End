import BankHelper from "../helpers/bankHelper";

const addBank = async (req, res) => {
  const { name, location } = req.body;
  const nameExists = await BankHelper.bankExists("name", req.body.name);
  if (nameExists) {
    return res.status(200).json({
      status: 200,
      message: "Successfully Created",
    });
  }
  const bank = {
    name,
    location,
  };
  return res.status(400).json({
    status: 400,
    error: "Bad request",
  });
};
return { addBank };
