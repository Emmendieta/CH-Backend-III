import { isValidObjectId } from "mongoose";
import { usersRepository } from "../repositories/repository.js";
import { verifyToken } from "../helpers/token.helper.js";

const setupPolicies = (policies) => async (req, res, next) => {
    try {
        //Si la politica es publica dejo pasar:
        if (policies.includes("public")) { return next(); };
        //Ahora si las politicias no son publicas, necesito el token:
        const token = req?.cookies?.token;
        if (!token) { return res.json401(); };
        //Verifico el Token:
        const data = verifyToken(token);
        const { user_id, email, role } = data;
        if (!isValidObjectId(user_id)) { return res.json401("Invalid user Id!"); };
        if (!user_id || !email || !role) { return res.json401(); };
        const listRoles = {
            user: policies.includes("user"),
            admin: policies.includes("admin")
        };
        if (!listRoles[role]) { return res.json401(); };
        const user = await usersRepository.readById(user_id);
        if (!user) { return res.json404("User not Found!"); };
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default setupPolicies;