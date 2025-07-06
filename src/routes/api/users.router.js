import usersController from "../../controllers/users.controller.js";
import RouterHelper from "../../helpers/router.helper.js";

class UserRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };

    init = () => {
        this.read("/:uid", ["user", "admin"], usersController.getUser);
        this.read("/", ["admin"], usersController.getAllUsers);
        this.create("/", ["public"], usersController.createUser);
        this.update("/:uid", ["user", "admin"], usersController.updateUser);
        this.destroy("/:uid", ["admin"], usersController.deleteUser);
    };
};

const usersRouter = (new UserRouter()).getRouter();

export default usersRouter;