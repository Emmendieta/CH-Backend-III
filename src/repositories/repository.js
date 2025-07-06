import UserDTO from "../dto/User.dto.js";
import PetDTO from "../dto/Pet.dto.js";
import AdoptionDTO from "../dto/Adoptions.dto.js";
import { userManger, petManager, adoptionManager } from "../dao/mongo/dao.mongo.js";

class Repository {
    constructor(manager, Dto) {
        this.manager = manager;
        this.Dto = Dto;
    };

    createOne = async (data) => await this.manager.createOne(new this.Dto(data));
    readAll = async () => await this.manager.readAll();
    readById = async (id) => await this.manager.readById(id);
    readByFilter = async (filter) => await this.manager.readByFilter(filter);
    updateById = async (id, data) => await this.manager.updateById(id, data);
    destroyById = async (id) => await this.manager.destroyById(id);
};

const usersRepository = new Repository(userManger, UserDTO);
const petsRepository = new Repository(petManager, PetDTO);
const adoptionRepository = new Repository(adoptionManager, AdoptionDTO);

export { usersRepository, petsRepository, adoptionRepository };