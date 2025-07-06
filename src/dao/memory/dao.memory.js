import userModel from "../mongo/models/User.js";
import petModel from "../mongo/models/Pet.js";
import adoptionModel from "../mongo/models/Adoption.js";

class DaoMemory {
    constructor() { { /* Falta la logica */ } }
    createOne = async (data) => { /* Falta la logica */ };
    readAll = async (filter) => { /* Falta la logica */ };
    readById = async (id) => { /* Falta la logica */ };
    readByFilter = async (filter) => { /* Falta la logica */ };
    updateById = async (id, data) => { /* Falta la logica */ };
    destroyById = async (id) => { /* Falta la logica */ };
};

const usersManagerMemory = new DaoMemory(userModel);
const petsManagerMemory = new DaoMemory(petModel);
const adoptionManagerMemory = new DaoMemory(adoptionModel);