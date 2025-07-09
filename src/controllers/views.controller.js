import petsService from "../services/pets.service.js";
import usersService from "../services/user.service.js";
import adoptionsService from "../services/adoptions.service.js";
import { isValidObjectId } from "mongoose";
import moment from "moment";

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

    detailsView = async (req, res) => {
        const { pid } = req.params;
        if (!isValidObjectId(pid)) { res.status(404).render("error", { error: "Verify pet Id!" }); };
        const pet = await this.pService.readById(pid);
        if (!pet) { res.status(404).render("error", { error: "Pet not Found!" }); };
        res.status(200).render("details", { pet });
    };

    newPetView = async (req, res) => {
        res.status(200).render("pet", { pet: null });
    };

    editPetView = async (req, res) => {
        const { pid } = req.params;
        if (!isValidObjectId(pid)) { return res.status(404).render("error", { error: "Verify pet Id!" }); };
        let pet = await this.pService.readById(pid);
        if (!pet) { return res.status(404).render("error", { error: "Pet not Found!" }); };
        pet.birthDate = moment(pet.birthDate).format("YYYY-MM-DD");
        console.log(pet);
        res.status(200).render("pet", { pet });
    };

    /* USERS VIEWS */

    userView = async (req, res) => {
        const users = await this.uService.readAll();
        if (users.length === 0) { res.json404("Not users avalible!").render("error"); };
        res.status(200).render("users", { users });
    };

    userPetsViews = async (req, res) => {
        const { user } = req;
        const uid = user._id.toString();
        let userBD = await this.uService.readById(uid);
        if (!user) { res.json404("Couldn't get user info").render("error"); };
        if (!user.pets || user.pets.length === 0) { return res.json404("Not pets associate to the user!").render("error"); };
        const petsIds = userBD.pets.map(p => p._id.toString());
        const pets = await Promise.all(petsIds.map(pid => this.pService.readById(pid)));
        console.log(pets);
        res.status(200).render("user-pets", { pets });
    }

    /*AUTH VIEWS */

    loginView = async (req, res) => res.status(200).render("login");

    registerView = async (req, res) => res.status(200).render("register");

    profileView = async (req, res) => {
        const { user } = req;
        res.status(200).render("profile", { user });
    };

    updateView = async (req, res) => {
        const { user } = req;
        res.status(200).render("update-user", { user });
    };

    updateViewAdmin = async (req, res) => {
        const { uid } = req.params;
        if (!isValidObjectId(uid)) { return res.status(400).render("error", { error: "Invalid user Id!" }); };
        const user = await this.uService.readById(uid);
        if (!user) { return res.status(404).render("error", { error: "User not Found!" }); };
        res.status(200).render("user", { user });
    };

    /* ADOPTIONS */

    editAdoptionView = async (req, res) => {
        const { aid } = req.params;
        if (!isValidObjectId(aid)) { return res.status(400).render("error", { error: "Invalid adoptation id!" }); };
        const adoption = await this.aService.readById(aid);
        if (!adoption) { return res.status(404).render("error", { error: "Adoption not Found!" }); };
        res.status(200).render("adoption", { adoption });
    };

    getAllAdoptionsView = async(req, res) => {
        const adoptions = await this.aService.readAll();
        if (adoptions.length === 0) { return res.status(404).render("error", { error: "No adoptions fund!"}); };
        return res.status(200).render("adoptions", { adoptions });
    }
};

const viewsController = new ViewsController();

export default viewsController;