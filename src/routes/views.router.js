import viewsController from "../controllers/views.controller.js";
import RouterHelper from "../helpers/router.helper.js";

class ViewsRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };

    init = () => {
        this.render("/", ["public"], viewsController.indexView);
        /*PETS*/
        this.render("/pets", ["public"], viewsController.petsView);
        this.render("/details/:pid", ["public"], viewsController.detailsView);
        this.render("/pets/create", ["admin"], viewsController.newPetView);
        this.render("/pets/edit/:pid", ["admin"], viewsController.editPetView);
        /*USERS*/
        this.render("/users", ["admin"], viewsController.userView);
        this.render("/login", ["public"], viewsController.loginView);
        this.render("/register", ["public"], viewsController.registerView);
        this.render("/profile", ["user", "admin"], viewsController.profileView);
        this.render("/update-user", ["user", "admin"], viewsController.updateView);
    };
};

const viewsRouter = (new ViewsRouter()).getRouter();

export default viewsRouter;