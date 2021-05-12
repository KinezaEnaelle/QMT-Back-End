import WalletHelper from "../helpers/walletHelper";

const addWallet = async (req, res) => {
  const { userId, balance } = req.body;
  const wallet = { userId, balance };
  const createWallet = await WalletHelper.saveWallet(wallet);
  if (createWallet) {
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
export { addWallet };
