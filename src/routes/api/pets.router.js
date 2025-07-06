import petsController from "../../controllers/pets.controller.js";
import RouterHelper from "../../helpers/router.helper.js";

class PetsRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };

    init = () => {
        this.read('/', ["public"], petsController.getAllPets);
        this.read('/:pid', ["public"], petsController.getPetById);
        this.create('/',["admin"], petsController.createPet);
        /* this.create('/withimage', uploader.single('image'), petsController.createPetWithImage); */
        this.update('/:pid', ["admin"], petsController.updatePet);
        this.destroy('/:pid', ["admin"], petsController.deletePet);
    };
};

const petsRouter = (new PetsRouter()).getRouter();

export default petsRouter;
