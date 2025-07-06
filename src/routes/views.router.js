import viewsController from "../controllers/views.controller.js";
import RouterHelper from "../helpers/router.helper.js";

class ViewsRouter extends RouterHelper { 
    constructor() {
        super();
        this.init();
    };

    init = () => {
        this.render("/", ["public"], viewsController.indexView);
        this.render("/pets", ["public"], viewsController.petsView);
        this.render("/users", ["admin"], viewsController.userView);
        this.render("/login", ["public"], viewsController.loginView);
        this.render("/register", ["public"], viewsController.registerView);        
    };
};

const viewsRouter = (new ViewsRouter()).getRouter();

export default viewsRouter;