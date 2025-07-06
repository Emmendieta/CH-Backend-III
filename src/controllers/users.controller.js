import { isValidObjectId } from "mongoose";
import { createHash } from "../helpers/hash.helper.js";
import usersService from "../services/user.service.js";

class UsersController {
    constructor() {
        this.uService = usersService;
    };

    createUser = async (req, res) => {
        const data = req.body;
        if(!data || !data.first_name || !data.last_name || !data.email || !data.password) { res.json400("Missgin Information!"); };
        const passHass = createHash(data.password);
        data.password = passHass;
        const response = await this.uService.createOne(data);
        res.json201(response);
    };

    getUserById = async (req, res) => {
        const { id } = req.params;
        if (!isValidObjectId(id)) { res.json400("Invalid user Id!"); };
        const response = await this.uService.readById(id);
        if(!response) { res.json404("User not Found!"); };
        res.json200(response);
    };

    getUserByFilter = async (req, res) => {
        const { email } = req.params;
        if(!email) { return res.json404("Error getting the email!"); };
        const response = await this.uService.readByFilter({ email });
        if(!response) { res.json404("User not Found!"); };
        res.json200(response);
    };

    getAllUsers = async (req, res) => {
        const response = await this.uService.readAll();
        if (response.length === 0) { res.json404(); };
        res.json200(response);
    };

    updateUser = async (req, res) => {
        const { _id } = req.user;
        const data = req.body;
        if (!isValidObjectId(_id)) { return res.json400("Invalid user Id!"); };
        if (!data) { return res.json400("No data to update!"); };
        const verifyUser = await this.uService.readById(_id);
        if (!verifyUser) { return res.json404("User not Found!"); };
        const response = await this.uService.updateById(_id, data) ;
        res.json200(response);
    };

    deleteUser = async (req, res) => {
        const { id } = req.params;
        if (!isValidObjectId(id)) { res.json400("Invalid user Id!"); };
        const user = await this.uService.readById(id);
        if(!user) { return res.json400("User not Found!"); };
        //FALTA IMPLEMENTAR QUE NO SE PUEDA BORRAR UN USUARIO SI TIENE PETS
        const response = await this.uService.deleteById(id);
        res.json200(response);
    };
};

const usersController = new UsersController();

export default usersController;