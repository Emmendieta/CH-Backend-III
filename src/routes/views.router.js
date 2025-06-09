import { Router } from "express";
import viewsController from "../controllers/views.controller.js";

class ViewsRouter {
    constructor() {
        this.router = Router();
        this.init();
    };
    init = () => {
        this.router.get("/", (req, res) => res.send("Hola mundo"));
        this.router.get("/pets", viewsController.petsView);
        this.router.get("/users", viewsController.userView);
    };

    getRouter = () => this.router;
};

const viewsRouter = (new ViewsRouter().getRouter());

export default viewsRouter;