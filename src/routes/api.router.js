import usersRouter from "./api/users.router.js";
import petsRouter from "./api/pets.router.js";
import mocksRouter from "./mocks.router.js";
import RouterHelper from "../helpers/router.helper.js";
import authRouter from "../routes/api/auth.router.js";

class ApiRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.use("/users", usersRouter);
        this.use("/pets", petsRouter);
        this.use("/mocks", mocksRouter);
        this.use("/auth", authRouter);
    };
};

const apiRouter = (new ApiRouter()).getRouter();

export default apiRouter;