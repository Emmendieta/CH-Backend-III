import { adoptionRepository } from "../repositories/repository.js";
import Service from "./service.js";

class AdoptionService extends Service {
    constructor() {
        super(adoptionRepository);
    };
    //Métodos particulares de Adoption:

};

const adoptionsService = new AdoptionService(adoptionRepository);

export default adoptionRepository;