import RouterHelper from "../helpers/router.helper.js";
import usersRouter from "./api/users.router.js";
import authRouter from "./api/auth.router.js";
import petsRouter from "./api/pets.router.js";

class ApiRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };

    init = () => {
        this.use("/users", usersRouter);
        this.use("/auth", authRouter);
        this.use("/pets", petsRouter);
/*        this.use("/adoptions", cartsRouter);
        this.use("/mocks", mocksRouter); */
    };
};

const apiRouter = (new ApiRouter()).getRouter();

export default apiRouter;