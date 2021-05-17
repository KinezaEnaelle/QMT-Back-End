 import jwt from 'jsonwebtoken';
 import models from '../models';
import dotenv from 'dotenv';

const { User } = models;
dotenv.config();

const verifyToken = async(req,res,next) => {
    try {
        const token = req.header('token');
        if(token){
            const verify = jwt.verify(token, process.env.PRIVATE_KEY);
            const exists = await User.findOne({
                where: {
                    id: verify.id
                }
            });
            if (exists) {
                req.user = exists;
                return next();
            }
            return res.status(401).json({
                status: 401,
                error: 'Invalid security token.'
            });
        }
        return res.status(401).json({
            status: 401,
            error: 'No security token was provided.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            error: 'Server error'
        });
    }
}

export {
    verifyToken
};
