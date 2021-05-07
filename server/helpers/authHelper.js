import models from '../models';
const { User } = models;

class AuthHelper {
    static async userExists(attr, val){
        const user = await User.findOne({ where : {[attr]: val }});
        return user;
    }
    static async saveUser(user){
        const acceptedUser = await User.create(
            {
                ...user,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                fields: [
                    'name',
                    'email',
                    'phoneNumber',
                    'createdAt',
                    'updatedAt'
                ],
            }
        );
        return acceptedUser;
    }
}
export default AuthHelper;