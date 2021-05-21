const transferMoney = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: `we'll do this in a while`,
    convertingTo: req.currency,
    rate: "TBD",
  });
};

export { transferMoney };
