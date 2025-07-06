import petsService from "../services/pets.service.js";
import usersService from "../services/user.service.js";
import adoptionsService from "../services/adoptions.service.js";

class ViewsController {
    constructor() {
        this.uService = usersService;
        this.pService = petsService;
        this.aService = adoptionsService;
    };

    indexView = async (req, res) => {
        const pets = await this.pService.readAll();
        if (pets.length === 0) { res.json404("Not pets avalible!").render("error"); };
        const user = req.user || null;
        res.status(200).render("index", { pets, isAdmin: user?.role === "admin" });
    };

    /* PETS VIEWS */

    petsView = async (req, res) => {
        const pets = await this.pService.readAll();
        if (pets.length === 0) { res.json404("Not pets avalible!").render("error"); };
        res.status(200).render("pets", { pets });
    };

    /* USERS VIEWS */

    userView = async (req, res) => {
        const users = await this.uService.readAll();
        if (users.length === 0) { res.json404("Not users avalible!").render("error"); };
        res.status(200).render("users", { users });
    };

    /*AUTH VIEWS */

    loginView = async (req, res) => res.status(200).render("login");

    registerView = async ( req, res) => res.status(200).render("register");

};

const viewsController = new ViewsController();

export default viewsController;