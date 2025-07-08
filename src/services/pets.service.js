import { petsRepository } from "../repositories/repository.js";


class PetsService {
    constructor() {
        this.manager = petsRepository;
    };
    //Métodos particulares de Pets:
    createOne = async (data) => await this.manager.createOne(data);
    readAll = async () => await this.manager.readAll();
    readById = async (pid) => await this.manager.readById(pid);
    readByFilter = async (filter) => await this.manager.readByFilter(filter);
    updateOneById = async (pid, data) => await this.manager.updateById(pid, data);
    destroyById = async (pid) => await this.manager.destroyById(pid);
};

const petsService = new PetsService(petsRepository);

export default petsService;