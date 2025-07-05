import { petsService, usersService } from "../services/index.js";

class ViewController {
    constructor() {
        this.uService = usersService;
        this.pService = petsService;
    };

    petsView = async (req, res) => {
        const pets = await this.pService.getAll();
        if (pets.length === 0 ) { res.status(404).json({message: "Pets not found!"}); }
        res.status(200).render("pets", { pets });
    };

    userView = async (req, res) => {
        const users = await this.uService.getAll();
        if (users.length === 0 ) { res.status(404).json({message: "Users not found!"}); }
        res.status(200).render("users", { users });
    };


};

const viewsController = new ViewController();

export default viewsController;