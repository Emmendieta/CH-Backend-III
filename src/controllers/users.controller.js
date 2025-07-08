import { isValidObjectId } from "mongoose";
import { createHash } from "../helpers/hash.helper.js";
import usersService from "../services/user.service.js";
import petsService from "../services/pets.service.js";

class UsersController {
    constructor() {
        this.uService = usersService;
        this.pService = petsService;
    };

    createUser = async (req, res) => {
        const data = req.body;
        if (!data || !data.first_name || !data.last_name || !data.email || !data.password) { return res.json400("Missgin Information!"); };
        const passHass = createHash(data.password);
        data.password = passHass;
        const response = await this.uService.createOne(data);
        res.json201(response);
    };

    getUserById = async (req, res) => {
        const { uid } = req.params;
        if (!isValidObjectId(uid)) { return res.json400("Invalid user Id!"); };
        const response = await this.uService.readById(uid).populate("Pets");
        if (!response) { return res.json404("User not Found!"); };
        res.json200(response);
    };

    getUserByFilter = async (req, res) => {
        const { email } = req.params;
        if (!email) { return res.json404("Error getting the email!"); };
        const response = await this.uService.readByFilter({ email });
        if (!response) { return res.json404("User not Found!"); };
        res.json200(response);
    };

    getAllUsers = async (req, res) => {
        const response = await this.uService.readAll();
        if (response.length === 0) { return res.json404(); };
        res.json200(response);
    };

    updateUser = async (req, res) => {
        const { _id } = req.user;
        const data = req.body;
        if (!isValidObjectId(_id)) { return res.json400("Invalid user Id!"); };
        if (!data) { return res.json400("No data to update!"); };
        const verifyUser = await this.uService.readById(_id);
        if (!verifyUser) { return res.json404("User not Found!"); };
        const response = await this.uService.updateOneById(_id, data);
        res.json200(response);
    };

    updateUserAdmin = async (req, res) => {
        const { uid } = req.params;
        const data = req.body;
        if (!isValidObjectId(uid)) { return res.json400("Invalid user Id!"); };
        if (!data) { return res.json400("No data to update!"); };
        const passHass = createHash(data.password);
        data.password = passHass;
        const verifyUser = await this.uService.readById(uid);
        if (!verifyUser) { return res.json404("User not Found!"); };
        const response = await this.uService.updateOneById(uid, data);
        res.json200(response);
    };

    deleteUser = async (req, res) => {
        const { uid } = req.params;
        if (!isValidObjectId(uid)) {return res.json400("Invalid user Id!"); };
        const user = await this.uService.readById(uid);
        if (!user) { return res.json400("User not Found!"); };
        //FALTA IMPLEMENTAR QUE NO SE PUEDA BORRAR UN USUARIO SI TIENE PETS
        const response = await this.uService.destroyById(uid);
        res.json200(response);
    };

    getUserPets = async (req, res) => {
/*         const { uid } = req.params;
        if (!isValidObjectId(uid)) { return res.json400("Invalid user Id!"); };
        const user = await this.uService.readByIdPopulatePets(uid);
        if (!user) { return res.json404("User not found!"); };
        let petsUser = user.pets;
        if (!petsUser || petsUser.length === 0) { return json404("The User has not Pets adopted!"); }
        else {
            for (const pet of petsUser) {
                console.log(pet._id);
                //const response = await this.pService.readById(pet._id);
            };
        } */
    };

};

const usersController = new UsersController();

export default usersController;