import RouterHelper from "../helpers/router.helper.js";
import usersRouter from "./api/users.router.js";
import authRouter from "./api/auth.router.js";
import petsRouter from "./api/pets.router.js";
import mocksRouter from "./mocks.router.js";
import adoptionsRouter from "./api/adoption.router.js";

class ApiRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };

    init = () => {
        this.use("/users", usersRouter);
        this.use("/auth", authRouter);
        this.use("/pets", petsRouter);
        this.use("/adoptions", adoptionsRouter);
        this.use("/mocks", mocksRouter); 
    };
};

const apiRouter = (new ApiRouter()).getRouter();

export default apiRouter;