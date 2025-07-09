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
        this.read("/:uid/:pid", ["user", "admin"], adoptionsController.getAdoptionByIdUserPet);
        this.create("/:uid/:pid", ["user", "admin"], adoptionsController.createAdoption);
        this.update("/:aid", ["admin"], adoptionsController.updateAdiptionById);
        this.destroy("/:aid", ["admin"], adoptionsController.deleteAdoption);
    };
};

const adoptionsRouter = (new AdoptionRouter()).getRouter();

export default adoptionsRouter;