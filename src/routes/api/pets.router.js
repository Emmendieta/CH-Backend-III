import petsController from '../../controllers/pets.controller.js';
import uploader from '../../utils/uploader.js';
import RouterHelper from '../../helpers/router.helper.js';

class PetsRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };

    init = () => {
        this.read('/', petsController.getAllPets);
        this.create('/', petsController.createPet);
        this.create('/withimage', uploader.single('image'), petsController.createPetWithImage);
        this.update('/:pid', petsController.updatePet);
        this.destroy('/:pid', petsController.deletePet);
    }
};

const petsRouter = (new PetsRouter()).getRouter();

/* const petsRouter = Router();

petsRouter.get('/', petsController.getAllPets);
petsRouter.post('/', petsController.createPet);
petsRouter.post('/withimage', uploader.single('image'), petsController.createPetWithImage);
petsRouter.put('/:pid', petsController.updatePet);
petsRouter.delete('/:pid', petsController.deletePet);
 */
export default petsRouter;