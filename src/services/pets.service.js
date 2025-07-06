import { petsRepository } from "../repositories/repository.js";
import Service from "./service.js";

class PetsService extends Service {
    constructor() {
        super(petsRepository);
    };
    //Métodos particulares de Pets:

};

const petsService = new PetsService(petsRepository);

export default petsService;