import { Router } from "express";
import usersRouter from "./api/users.router.js";
import petsRouter from "./api/pets.router.js";
import mocksRouter from "./mocks.router.js";

class ApiRouter {
    constructor() {
        this.router = Router();
        this.init();
    };
    init = () => {
        this.router.use("/users", usersRouter);
        this.router.use("/pets", petsRouter);
        this.router.use("/mocks", mocksRouter);
    };

    getRouter = () => this.router;
};

const apiRouter = (new ApiRouter()).getRouter();

export default apiRouter;