import UserHelper from '../helpers/authHelper';

const validateNumber = async (req, res, next) => {
  const { phoneNumber } = req.body;
  const rwandaExp = new RegExp(/^2507[2,3,8][0-9]{7}$/).test(phoneNumber);
  const ugandaExp = new RegExp(/^2567[0,5,7,8][0-9]{7}$/).test(phoneNumber);
  const tanzaniaExp = new RegExp(/^255[62,65,75,78][0-9]{8}$/).test(
    phoneNumber
  );
  const kenyaExp = new RegExp(/^2547[0,1,2,9][0-9]{7}$/).test(phoneNumber);
  const burundiExp = new RegExp(
    /^257[61,62,68,69,71,72,75,76,77,79][0-9]{7}$/
  ).test(phoneNumber);
    const senderNumber = req.user.phoneNumber;
    if(senderNumber === String(phoneNumber)) {
      return res.status(401).json({
        status: 401,
        error: "cannot send to yourself",
      });
    } else {
      const userExists = await UserHelper.userExists('phoneNumber', String(phoneNumber));
      if (userExists) {
        req.toUser = userExists;
        if (rwandaExp) {
          req.toCurrency = "RWF";
          return next();
        } else if (tanzaniaExp) {
          req.toCurrency = "TZS";
          return next();
        } else if (ugandaExp) {
          req.toCurrency = "UGX";
          return next();
        } else if (kenyaExp) {
          req.toCurrency = "KES";
          return next();
        } else if (burundiExp) {
          req.toCurrency = "BIF";
          return next();
        }
        return res.status(401).json({
          status: 401,
          error: "invalid phone number",
        });
      }
      return res.status(404).json({
        status: 404,
        error: "receiver not found",
      });
    }
};

export { validateNumber };
