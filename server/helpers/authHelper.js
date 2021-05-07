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
                    'fname',
                    'lname',
                    'country',
                    'email',
                    'phoneNumber',
                    'password',
                    'salt',
                    'createdAt',
                    'updatedAt'
                ],
            }
        );
        return acceptedUser;
    }
}
export default AuthHelper;