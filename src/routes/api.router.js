import { Router } from "express";
import usersRouter from "./api/users.router.js";
import petsRouter from "./api/pets.router.js";
import mocksRouter from "./mocks.router.js";
import RouterHelper from "../helpers/router.helper.js";

class ApiRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.router.use("/users", usersRouter);
        this.router.use("/pets", petsRouter);
        this.router.use("/mocks", mocksRouter);
    };
};

const apiRouter = (new ApiRouter()).getRouter();

export default apiRouter;