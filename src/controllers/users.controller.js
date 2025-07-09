import { isValidObjectId } from "mongoose";
import { createHash } from "../helpers/hash.helper.js";
import usersService from "../services/user.service.js";
import petsService from "../services/pets.service.js";

class UsersController {
    constructor() {
        this.uService = usersService;
        this.pService = petsService;
    };

    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: Create a new user
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
     *     responses:
     *       201:
     *         description: User successfully created
     *       400:
     *         description: Missing required information
     */

    createUser = async (req, res) => {
        const data = req.body;
        if (!data || !data.first_name || !data.last_name || !data.email || !data.password) { return res.json400("Missgin Information!"); };
        const passHass = createHash(data.password);
        data.password = passHass;
        const response = await this.uService.createOne(data);
        res.json201(response);
    };

    /**
     * @swagger
     * /api/users/{uid}:
     *   get:
     *     summary: Get a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: uid
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID
     *     responses:
     *       200:
     *         description: User found
     *       400:
     *         description: Invalid user ID
     *       404:
     *         description: User not found
     */

    getUserById = async (req, res) => {
        const { uid } = req.params;
        if (!isValidObjectId(uid)) { return res.json400("Invalid user Id!"); };
        const response = await this.uService.readById(uid).populate("Pets");
        if (!response) { return res.json404("User not Found!"); };
        res.json200(response);
    };

    /**
     * @swagger
     * /api/users/email/{email}:
     *   get:
     *     summary: Get user by email
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: email
     *         required: true
     *         schema:
     *           type: string
     *         description: User email
     *     responses:
     *       200:
     *         description: User found
     *       404:
     *         description: User not found
     */

    getUserByFilter = async (req, res) => {
        const { email } = req.params;
        if (!email) { return res.json404("Error getting the email!"); };
        const response = await this.uService.readByFilter({ email });
        if (!response) { return res.json404("User not Found!"); };
        res.json200(response);
    };


    /**
     * @swagger
     * /api/users:
     *   get:
     *     summary: Get all users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: List of users
     *       404:
     *         description: No users found
     */

    getAllUsers = async (req, res) => {
        const response = await this.uService.readAll();
        if (response.length === 0) { return res.json404(); };
        res.json200(response);
    };

    /**
     * @swagger
     * /api/users/{uid}:
     *   put:
     *     summary: Update a user's own data
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: uid
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID
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
     *     responses:
     *       200:
     *         description: User updated
     *       400:
     *         description: Invalid user Id! or No data to update!
     *       404:
     *         description: User not Found!
     */

    updateUser = async (req, res) => {
        const { _id } = req.user;
        const data = req.body;
        if (!isValidObjectId(_id)) { return res.json400("Invalid user Id!"); };
        if (!data) { return res.json400("No data to update!"); };
        const verifyUser = await this.uService.readById(_id);
        if (!verifyUser) { return res.json404("User not Found!"); };
        const response = await this.uService.updateOneById(_id, data);
        res.json200(response);
    };

    /**
     * @swagger
     * /api/users/admin/{uid}:
     *   put:
     *     summary: Update a user as admin
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: uid
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID
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
     *         description: User updated
     *       400:
     *         description: Invalid data
     *       404:
     *         description: User not found
     */

    updateUserAdmin = async (req, res) => {
        const { uid } = req.params;
        const data = req.body;
        if (!isValidObjectId(uid)) { return res.json400("Invalid user Id!"); };
        if (!data) { return res.json400("No data to update!"); };
        const passHass = createHash(data.password);
        data.password = passHass;
        const verifyUser = await this.uService.readById(uid);
        if (!verifyUser) { return res.json404("User not Found!"); };
        const response = await this.uService.updateOneById(uid, data);
        res.json200(response);
    };

    /**
     * @swagger
     * /api/users/{uid}:
     *   delete:
     *     summary: Delete a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: uid
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID
     *     responses:
     *       200:
     *         description: User deleted
     *       400:
     *         description: Invalid ID or user has adopted pets
     *       404:
     *         description: User not found
     */

    deleteUser = async (req, res) => {
        const { uid } = req.params;
        if (!isValidObjectId(uid)) {return res.json400("Invalid user Id!"); };
        const user = await this.uService.readById(uid);
        if (!user) { return res.json400("User not Found!"); };
        if (user.pets.length > 0) { return res.json400("Couldn't delete an user that has pets adopted!"); };
        const response = await this.uService.destroyById(uid);
        res.json200(response);
    };

};

const usersController = new UsersController();

export default usersController;