import { verifyToken } from "../helpers/token.helper.js";
import UserRepository from "../repository/UserRepository.js";

const setupPolicies = (policies) => async (req, res, next) => {
    try {
        //Si la polictica es publica puedo dejar pasar:
        if(policies.includes("public")) { return next(); };
        //Si las politicas no son publicas, necesito recuperar el token:
        const token = req?.cookies?.token;
        if(!token) { return res.json401(); };
        //Verifico el token:
        const data = verifyToken(token); 
        const { user_id, email, role } = data;
        const listRoles = {
            USER: policies.includes("user"),
            ADMIN: policies.includes("admin")
        };
        if(!listRoles[role]) { return res.json401(); }
        const userRepository = new UserRepository();
        const user = await userRepository.getUserById(user_id);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default setupPolicies;