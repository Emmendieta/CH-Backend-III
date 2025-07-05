import { Router } from "express";
import apiRouter from "./api.router.js";
import viewsRouter from "./views.router.js";
import RouterHelper from "../helpers/router.helper.js";

class AppRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.router.use("/", viewsRouter);
        this.router.use("/api", apiRouter);
    };
};

const appRouter = (new AppRouter()).getRouter();

export default appRouter;