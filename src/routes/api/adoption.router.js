import adoptionsController from "../../controllers/adoptions.controller.js";
import RouterHelper from "../../helpers/router.helper.js";

class AdoptionRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };

    init = () => {
        this.read("/", ["admin"], adoptionsController.getAllAdoptions);
        this.read("/:aid", ["user", "admin"], adoptionsController.getADoptionById);
        this.create("/:uid/:pid", ["user", "admin"], adoptionsController.createAdoption);
    };
};

const adoptionsRouter = (new AdoptionRouter()).getRouter();

export default adoptionsRouter;