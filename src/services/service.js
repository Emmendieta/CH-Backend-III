import { usersRepository, petsRepository, adoptionRepository } from "../repositories/repository.js";
class Service {
    constructor(repository) {
        this.repository = repository;
    };
    createOne = async (data) => await this.repository.createOne(data);
    readAll = async () => await this.repository.readAll();
    readById = async (pid) => await this.repository.readById(pid);
    readByFilter = async (filter) => await this.repository.readByFilter(filter);
    updateById = async (pid, data) => await this.repository.updateById(pid, data);
    destroyById = async (pid) => await this.repository.destroyById(pid);
};

const userService = new Service(usersRepository);
const petsService = new Service(petsRepository);;
const adoptionsService = new Service(adoptionRepository);

export { userService, petsService, adoptionsService };