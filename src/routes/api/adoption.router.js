import adoptionsController from '../controllers/adoptions.controller.js';
import RouterHelper from '../../helpers/router.helper.js';
import Adoption from '../../dao/Adoption.js';

class AdoptionRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };

    init = () => {
        this.read('/', adoptionsController.getAllAdoptions);
        this.read('/:aid', adoptionsController.getAdoption);
        this.create('/:uid/:pid', adoptionsController.createAdoption);
    };
};

const adoptionRouter = (new AdoptionRouter()).getRouter();
/* 
const router = Router();

router.get('/', adoptionsController.getAllAdoptions);
router.get('/:aid', adoptionsController.getAdoption);
router.post('/:uid/:pid', adoptionsController.createAdoption); */

export default adoptionRouter;