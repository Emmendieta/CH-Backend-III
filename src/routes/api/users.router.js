import usersController from '../../controllers/users.controller.js';
import RouterHelper from '../../helpers/router.helper.js';

class UserRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.read('/', usersController.getAllUsers);
        this.read('/:uid', usersController.getUser);
        this.update('/:uid', usersController.updateUser);
        this.destroy('/:uid', usersController.deleteUser);
    };
}

const usersRouter = (new UserRouter()).getRouter();
/* const usersRouter = Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:uid', usersController.getUser);
usersRouter.put('/:uid', usersController.updateUser);
usersRouter.delete('/:uid', usersController.deleteUser); */


export default usersRouter;