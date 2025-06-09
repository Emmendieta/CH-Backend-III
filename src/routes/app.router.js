import { Router } from "express";
import apiRouter from "./api.router.js";
import viewsRouter from "./views.router.js";

class AppRouter  {
    constructor() {
        this.router = Router();
        this.init();
    };
    init = () => {
        this.router.use("/", viewsRouter);
        this.router.use("/api", apiRouter);
    };

    getRouter = () => this.router;
};

const appRouter = (new AppRouter()).getRouter();

export default appRouter;