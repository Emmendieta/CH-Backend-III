import userModel from "../mongo/models/User.js";
import petModel from "../mongo/models/Pet.js";
import adoptionModel from "../mongo/models/Adoption.js";

class DaoFS {
    constructor() { { /* Falta la logica */} }
    createOne = async (data) => { /* Falta la logica */};
    readAll = async (filter) => { /* Falta la logica */};
    readById = async (id) => { /* Falta la logica */};
    readByFilter = async (filter) => { /* Falta la logica */};
    updateById = async (id, data) => { /* Falta la logica */};
    destroyById = async (id) => { /* Falta la logica */};
}

const usersManagerFS = new DaoFS(userModel);
const petsManagerFS = new DaoFS(petModel);
const adoptionsManagerFS = new DaoFS(adoptionModel);

export { usersManagerFS, petsManagerFS, adoptionsManagerFS };
