import AuthHelper from "../helpers/authHelper";

class AuthController {
  static async signUp(req, res) {
    const emailExists = await AuthHelper.userExists("email", req.body.email);
    if (emailExists) {
      return res.status(409).json({
        status: 409,
        error: "This user already exists, use a....",
      });
    }
    const { name, email } = req.body;
    const user = { name, email };
    const savedUser = await AuthHelper.saveUser(user);
    if (savedUser) {
      return res.status(201).json({
        status: 201,
        message: " Successfully created",
        user,
      });
    }
  }
}
export default AuthController;