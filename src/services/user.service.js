import { usersRepository } from "../repositories/repository.js";

class UserService {
    constructor() {
        this.manager = usersRepository;
    };
    // Metodos particualr de UserService:
    createOne = async (data) => await this.manager.createOne(data);
    readAll = async () => await this.manager.readAll();
    readById = async (uid) => await this.manager.readById(uid);
    readByFilter = async (filter) => await this.manager.readByFilter(filter);
    updateOneById = async (uid, data) => await this.manager.updateById(uid, data);
    destroyById = async (uid) => await this.manager.destroyById(uid);
};

const usersService = new UserService(usersRepository);

export default usersService;