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
        if (!responseUser) { return res.json404("Couldn't update Users Pets!"); };
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
        if (!adoption) { return res.json404("Adoption not Found!"); };
        res.json200(adoption);
    };

    getAllAdoptions = async (req, res) => {
        const adoptions = await this.aService.readAll();
        if (adoptions.length === 0) { return res.json404(); };
        res.json200(adoptions);
    };

    getAdoptionByIdUserPet = async (req, res) => {
        const { uid, pid } = req.params;
        if (!isValidObjectId(uid)) { return res.json400("Invalid user Id"); };
        if (!isValidObjectId(pid)) { return res.json400("Invalid pet Id"); };
        const user = await this.uService.readById(uid);
        if (!user) { return res.json404("User not Found!"); };
        const pet = await this.pService.readById(pid);
        if (!pet) { return res.json404("Pet not Found!"); };
        const adopcion = await this.aService.readByFilter({ owner: user._id, pet: pet._id })
        if (!adopcion) { return res.json404("Adoption not Found!"); };
        res.json200(adopcion);
    };

    updateAdiptionById = async (req, res) => {
        const { owner: oldUid, pet: oldPid, newOwner: uid, newPet: pid } = req.body;
        const { aid } = req.params;
        // Validaciones:
        if (!isValidObjectId(uid)) { return res.json400("Invalid new user Id!"); }
        if (!isValidObjectId(pid)) { return res.json400("Invalid new pet Id!"); }
        if (!isValidObjectId(aid)) { return res.json400("Invalid adoption Id!"); }
        if (!isValidObjectId(oldUid)) { return res.json400("Invalid old user Id!"); }
        if (!isValidObjectId(oldPid)) { return res.json400("Invalid old pet Id!"); }
        // Buscar la info en la BD:
        let adopcion = await this.aService.readById(aid);
        if (!adopcion) { return res.json404("Adoption not found!"); }
        let oldUser = await this.uService.readById(oldUid);
        if (!oldUser) { return res.json404("Old user not found!"); }
        let newUser = await this.uService.readById(uid);
        if (!newUser) { return res.json404("New user not found!"); }
        let oldPet = await this.pService.readById(oldPid);
        if (!oldPet) { return res.json404("Old pet not found!"); }
        let newPet = await this.pService.readById(pid);
        if (!newPet) { return res.json404("New pet not found!"); }
        // Si todo es igual, no actualizar
        if (uid === oldUid && pid === oldPid) { return res.json404("User and pet are already associated with this adoption."); }
        //Caso 1: Mismo usuario, diferente mascota:
        if (uid === oldUid && pid !== oldPid) {
            //verifico que pet no exista en el array del usuario:
            let verifyPet = oldUser.pets.find(pet => pet._id.toString() === oldPid);
            if (!verifyPet) { return res.json404("Old Pet not found in old user!"); };
            //Elimino la asociacion del oldPet:
            oldPet = await this.pService.updateOneById(oldPid, { adopted: false, owner: null });
            if (!oldPet) { return res.json404("Couldn't update the old pet!"); };
            //Actualizo el pets al usuario:
            oldUser.pets = oldUser.pets.filter(pet => pet._id.toString() !== oldPid);
            oldUser.pets.push({ _id: pid });
            oldUser = await this.uService.updateOneById(oldUid, { pets: oldUser.pets });
            if (!oldUser) { return res.json404("Couldn't update pets in the user array!"); };
            //Asocio en el nuevo pet al usuario:
            newPet = await this.pService.updateOneById(pid, { adopted: true, owner: oldUid });
            if (!newPet) { return res.json404("Couldn't update the data from pet to associated the user!"); };
            //Actualizo la adoption:
            adopcion = await this.aService.updateOneById(aid, { owner: oldUid, pet: pid });
            if (!adopcion) { return res.json404("Couldn't update the data from the adoption!"); };
            return res.json200("Adoption updated!", { adopcion });
        };
        //Caso 2: Diferente usuario, mismo pet:
        if (uid !== oldUid && pid === oldPid) {
            //verifico que no existe le new pet en el nuevo usuario:
            let verifyPet = newUser.pets.find(pet => pet._id.toString() === pid);
            if (verifyPet) { return res.json404("Pet arlredy adopted by the same user!"); };
            //Si no existe, elimino el pet del usuario anterior:
            oldUser.pets = oldUser.pets.filter(pet => pet._id.toString() !== pid);
            oldUser = await this.uService.updateOneById(oldUid, { pets: oldUser.pets });
            if (!oldUser) { return res.json404("couldn't update data from older user!"); };
            //Actualizo los datos del nuevo usuario:
            newUser.pets.push({ _id: pid });
            newUser = await this.uService.updateOneById(uid, { pets: newUser.pets });
            if (!newUser) { return res.json404("Couldn't update data from new user!"); };
            //Actualizo los datos del pet:
            newPet = await this.pService.updateOneById(pid, { adopted: true, owner: uid });
            if (!newPet) { return res.json404("Couldn't update data from pet!"); };
            //Actualizo los datos de aoption:
            adopcion = await this.aService.updateOneById(aid, { owner: uid });
            if (!adopcion) { return res.json404("Couldn't update data from adoption!"); };
            return res.json200("Adotion updated!", { adopcion });
        };
        //Caso 3: Diferente usuario y pet:
        if (uid !== oldUid && pid !== oldPid) {
            //verifico que el nuevo usuario no tenga el nuevo pet:
            let verifyPet = newUser.pets.find(pet => pet._id.toString() === pid);
            if (verifyPet) { return res.json404("Pet alredy adopted by the new user!"); };
            //Si no existe, elimino el old pet del old user:
            oldUser.pets = oldUser.pets.filter(pet => pet._id.toString() !== oldPid);
            oldUser = await this.uService.updateOneById(oldUid, { pets: oldUser.pets });
            if (!oldUser) { return res.json404("Couldn't update data from old user!"); };
            //Actulizo los datos del old pet:
            oldPet = await this.pService.updateOneById(oldPid, { adopted: false, owner: null });
            if (!oldPet) { return res.json404("Coludn't update data from old pet!"); };
            //Actualizo los datos del new pet:
            newPet = await this.pService.updateOneById(pid, { adopted: true, owner: uid });
            if (!newPet) { return res.json404("Couldn't update data from new pet!"); };
            //Elimino el old pet del new user:
            newUser.pets = newUser.pets.filter(pet => pet._id.toString() !== oldPid);
            //Agrego el nuevo pet:
            newUser.pets.push({ _id: pid });
            newUser = await this.uService.updateOneById(uid, { pets: newUser.pets });
            if (!newUser) { return res.json404("Couldn't update data from new user!"); };
            //Actulizo los datos del adoption:
            adopcion = await this.aService.updateOneById(aid, { owner: uid, pet: pid });
            if (!adopcion) { return res.json404("Couldn't update data from adoption!"); };
            return res.json200("Adoption updated!", { adopcion });
        };
    };

    deleteAdoption = async (req, res) => {
        const { aid } = req.params;
        const { pid, uid } = req.body;
        if (!isValidObjectId(uid)) { return res.json400("Invalid user Id"); };
        if (!isValidObjectId(pid)) { return res.json400("Invalid pet Id"); };
        if (!isValidObjectId(aid)) { return res.json400("Invalid adpotion Id"); };
        const user = await this.uService.readById(uid);
        if (!user) { return res.json404("User not Found!"); };
        let pet = await this.pService.readById(pid);
        if (!pet) { return res.json404("Pet not Found!"); };
        const adopcion = await this.aService.readById(aid);
        if (!adopcion) { return res.json404("Adoption not Found!"); };
        let responsePet = await this.pService.updateOneById(pid, { adopted: false, owner: null });
        if (!responsePet) { return res.json404("Couldn't update pet data"); };
        const updatedPets = user.pets.filter(pet => pet._id.toString() !== pid);
        let responseUser = await this.uService.updateOneById(uid, { pets: updatedPets });
        if (!responseUser) { return res.json404("Couldn´t update user data!"); };
        let response = await this.aService.destroyById(aid);
        if (!response) { return res.json404("Couldn't delete adption!"); };
        return res.json200("Adpotion deleted!");
    };

};

const adoptionsController = new AdoptionsController();

export default adoptionsController;