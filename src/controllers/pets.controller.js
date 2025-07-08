import { isValidObjectId } from "mongoose";
import petsService from "../services/pets.service.js";

class PetsController {
    constructor() {
        this.pService = petsService;
    };

    createPet = async (req, res) => {
        const data = req.body;
        if(!data || !data.name || !data.specie || !data.birthDate) { res.json400("Missing Information!"); };
        const response = await this.pService.createOne(data);
        res.json201(response);
    };

    getPetById = async (req, res) => {
        const { id } = req.params;
        if (!isValidObjectId(id)) { return res.json400("Invalid pet Id!"); };
        const response = await this.pService.readById(id);
        if(!response) { res.json404("Pet not Found!"); };
        res.json200(response);
    };

    getPetByFilter = async (req, res) => {
        const { filter } = req.params;;
        if(!filter) { return res.json400("Error getting the parameters!"); };
        const response = await this.pService.readByFilter(filter);
        if(!response) { return res.json404("Pet not Found!"); };
        res.json200(response);
    };

    getAllPets = async (req, res) => {
        const response = await this.pService.readAll();
        if(response.length === 0) { return res.json404(); };
        res.json200(response);
    };

    updatePet = async (req, res) => {
        const { pid } = req.params;
        const data = req.body;
        if (!isValidObjectId(pid)) { return res.json400("Invalid pet Id!"); };
        if (!data) { return res.json400("No data to update!"); };
        const verifyPet = await this.pService.readById(pid);
        if (!verifyPet) { return res.json404("Pet not Found!"); };
        const response = await this.pService.updateOneById(pid, data);
        res.json200(response);
    };

    deletePet = async (req, res) => {
        const { pid } = req.params;
        if(!isValidObjectId(pid)) { return res.json400("Invalid pet Id!"); };
        const pet = await this.pService.readById(pid);
        if (!pet) { return res.json404("Pet not Found!"); };
        //Falta la logica que si se elimina un pet se tiene que eliminar de la lista del usuario que lo tenga
        const response = await this.pService.destroyById(pid);
        if (!response) { return res.json404("Couldn't delete the Pet!"); };
        res.json200(response);
    };
};

const petsController = new PetsController();

export default petsController;