import adoptionsService from "../services/adoptions.service.js";
import usersService from "../services/user.service.js";
import petsService from "../services/pets.service.js";
import { isValidObjectId } from "mongoose";

class AdoptionsController {
    constructor() {
        this.aService = adoptionsService;
        this.uService = usersService;
        this.pService = petsService;
    };

    createAdoption = async (req, res) => {
        const { uid, pid } = req.params;
        if (!isValidObjectId(uid)) { return res.json400("Invalid user Id!"); };
        if (!isValidObjectId(pid)) { return res.json400("Invalid pet Id!"); };
        const user = await this.uService.readById(uid);
        if (!user) { return res.json404("User not Found!"); };
        const pet = await this.pService.readById(pid);
        if (!pet) { return res.json404("Pet not Found!"); };
        if (pet.adopted) { return res.json400("Pet is alredy adopted!"); };
        user.pets.push(pet._id);
        const responseUser = await this.uService.updateOneById(uid, { pets: user.pets });
        if(!responseUser) { return res.json404("Couldn't update Users Pets!"); };
        const responsePet = await this.pService.updateOneById(pid, { adopted: true, owner: uid });
        if (!responsePet) { return res.json404("Couldn't update Pet!"); };
        const responseAdoption = await this.aService.createOne({ owner: uid, pet: pid });
        if (!responseAdoption) { return res.json404("Couldn't create Adoption!"); };
        res.json201(responseAdoption);
    };

    getADoptionById = async (req, res) => {
        const adpotionId = req.params.aid;
        if (!isValidObjectId(adpotionId)) { return res.json400("Invalid Adoption Id!"); }; 
        const adoption = await this.aService.readById({ _id: adpotionId });
        if(!adoption) { return res.json404("Adoption not Found!"); };
        res.json200(adoption);
    };

    getAllAdoptions = async (req, res) => {
        const adoptions = await this.aService.readAll();
        if (adoptions.length === 0) { return res.json404(); };
        res.json200(adoptions);
    };

    updateAdiptionById = async (req, res) => {
        //FALTA LOGICA
    };
    
    deleteAdoption = async (req, res) => {
        //FALTA LOGICA
    };

};

const adoptionsController = new AdoptionsController();

export default adoptionsController;