import { adoptionRepository } from "../repositories/repository.js";

class AdoptionService {
    constructor() {
        this.manager = adoptionRepository;
    };
    //Métodos particulares de Adoption:
    createOne = async (data) => await this.manager.createOne(data);
    readAll = async () => await this.manager.readAll();
    readById = async (aid) => await this.manager.readById(aid);
    readByFilter = async (filter) => await this.manager.readByFilter(filter);
    updateOneById = async (aid, data) => await this.manager.updateById(aid, data);
    destroyById = async (aid) => await this.manager.destroyById(aid);
};

const adoptionsService = new AdoptionService(adoptionRepository);

export default adoptionsService;