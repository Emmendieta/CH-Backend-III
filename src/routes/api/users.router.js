import usersController from "../../controllers/users.controller.js";
import RouterHelper from "../../helpers/router.helper.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for users gestion
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: User Id
 *         first_name:
 *           type: string
 *           description: First Name of the user
 *         last_name:
 *           type: string
 *           description: Last Name of the user
  *         email:
 *           type: string
 *           description: Email of the user
 *         role:
 *           type: string
 *           description: Role of the user
 *         pets:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Pet Id         
 */

class UserRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };

    init = () => {

        /**
         * @swagger
         * /api/users/{uid}:
         *   get:
         *     summary: Retrieve a user by ID (requires authentication)
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: uid
         *         required: true
         *         schema:
         *           type: string
         *         description: The ID of the user to retrieve
         *     responses:
         *       200:
         *         description: User successfully retrieved
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/User'
         *       400:
         *         description: Invalid user ID
         *       404:
         *         description: User not found
         */

        this.read("/:uid", ["user", "admin"], usersController.getUserById);
        //this.read("/:uid", ["public"], usersController.getUserById);

        /**
         * @swagger
         * /api/users:
         *   get:
         *     summary: Retrieve all users (admin only)
         *     tags: [Users]
         *     responses:
         *       200:
         *         description: List of users
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/User'
         *       404:
         *         description: No users found
         */

        this.read("/", ["admin"], usersController.getAllUsers);
        //this.read("/", ["public"], usersController.getAllUsers);

        /**
         * @swagger
         * /api/users:
         *   post:
         *     summary: Create a new user (public)
         *     tags: [Users]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json: 
         *           schema:
         *             type: object
         *             required:
         *               - first_name
         *               - last_name
         *               - email
         *               - password
         *             properties:
         *               first_name:
         *                 type: string
         *               last_name:
         *                 type: string
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *               role:
         *                 type: string
         *                 default: user
         *     responses:
         *       201:
         *         description: User created
         */

        this.create("/", ["public"], usersController.createUser);

        /**
         * @swagger
         * /api/users/{uid}:
         *   put:
         *     summary: Update user data (user or admin)
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: uid
         *         required: true
         *         schema:
         *           type: string
         *         description: User ID to update
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               first_name:
         *                 type: string
         *               last_name:
         *                 type: string
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *               role:
         *                 type: string
         *     responses:
         *       200:
         *         description: User successfully updated
         *       400:
         *         description: Invalid user ID or no data
         *       404:
         *         description: User not found
         */

        this.update("/:uid", ["user", "admin"], usersController.updateUser);
        //this.update("/:uid", ["public"], usersController.updateUser);

        /**
         * @swagger
         * /api/users/admin/{uid}:
         *   put:
         *     summary: Update user data (admin only)
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: uid
         *         required: true
         *         schema:
         *           type: string
         *         description: User ID to update
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               first_name:
         *                 type: string
         *               last_name:
         *                 type: string
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *               role:
         *                 type: string
         *     responses:
         *       200:
         *         description: User successfully updated
         *       400:
         *         description: Invalid user ID or missing data
         *       404:
         *         description: User not found
         */

        this.update("/admin/:uid", ["admin"], usersController.updateUserAdmin);
        //this.update("/admin/:uid", ["public"], usersController.updateUserAdmin);

        /**
         * @swagger
         * /api/users/{uid}:
         *   delete:
         *     summary: Delete a user by ID (admin only)
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: uid
         *         required: true
         *         schema:
         *           type: string
         *         description: User ID to delete
         *     responses:
         *       200:
         *         description: User successfully deleted
         *       400:
         *         description: Invalid ID or user has pets
         *       404:
         *         description: User not found
         */

        this.destroy("/:uid", ["admin"], usersController.deleteUser);
        //this.destroy("/:uid", ["public"], usersController.deleteUser);

    };
};

const usersRouter = (new UserRouter()).getRouter();

export default usersRouter;