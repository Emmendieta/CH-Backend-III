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
        this.render("/users", ["public"], viewsController.userView);
    };

    getRouter = () => this.router;
};

const viewsRouter = (new ViewsRouter()).getRouter();

export default viewsRouter;