import { usersRepository } from "../repositories/repository.js";
import Service from "./service.js";

class UserService extends Service {
    constructor() {
        super(usersRepository);
    };
    //Métodos particulares de Users:


};

const usersService = new UserService(usersRepository);

export default usersService;