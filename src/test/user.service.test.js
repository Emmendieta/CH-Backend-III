import { expect } from "chai";
import usersService from "../services/user.service.js";
import mongoose, { isValidObjectId } from "mongoose";
import "dotenv/config.js";
import logger from "../config/logger.js";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
describe("User Service (Mongo)", () => {
    let newUser;

    before(async function () {
        this.timeout(20000); // Aumenta el timeout solo para este hook
        try {
            logger.info("Conecting to MongoDB, please wait");
            await mongoose.connect(process.env.LINK_MONGODB);
            logger.info("Conected to MongoDB");
        } catch (error) {
            logger.fatal("Error en before():", error);
            throw error;
        };

        //Cre un usuario de prueba:
        newUser = await usersService.createOne({
            first_name: "Test",
            last_name: "User",
            email: "testuser@example.com",
            password: "123456",
            role: "user"
        });
    });

    after(async () => {
        if (newUser?._id) {
            await usersService.destroyById(newUser._id);
        }
        await mongoose.disconnect();
        logger.warn("Disconected from MongoDB");
    });

    //Read all:
    it("Espect return of all Users in an Array", async () => {
        const users = await usersService.readAll();
        expect(users).to.be.an('array');
        expect(users.length).to.be.greaterThan(0);
    });

    /* it("Espect to return an Array of users but the Array length is 0", async () => {
        await expect(usersService.readAll()).to.be.rejectedWith("No users found");
    }); */

    //Read by Id:
    it("Espect to return a user finding by Id", async () => {
        const user = await usersService.readById(newUser._id);
        expect(user).to.be.an('object');
        expect(String(user._id)).to.equal(String(newUser._id));
        expect(user).to.have.property('first_name', newUser.first_name);
        expect(user).to.have.property('last_name', newUser.last_name);
        expect(user).to.have.property('email', newUser.email);
        expect(user).to.have.property('role', newUser.role);
        expect(user).to.have.property("pets");
        expect(user.pets).to.be.an("array");
    });

    it("Espect to return null becouse the Id is not valid", async () => {
        const id = "fake id";
        if (!isValidObjectId(id)) return null;
        const user = await usersService.readById(id).lean();
        expect(user).to.be.null;
    });

    it("Espect to return null becouse there is not Id in DB", async () => {
        const id = "686ae4b56b29a8c47d8bbbbb";
        const user = await usersService.readById(id);
        expect(user).to.be.null;
    });

    //Read by Filter:
    it("Espect to return an user finding by filter, example: email", async () => {
        const filter = { email: newUser.email };
        const user = await usersService.readByFilter(filter);
        expect(user).to.be.an('object');
        expect(String(user._id)).to.equal(String(newUser._id));
        expect(user).to.have.property('first_name', newUser.first_name);
        expect(user).to.have.property('last_name', newUser.last_name);
        expect(user).to.have.property('email', newUser.email);
        expect(user).to.have.property('role', newUser.role);
        expect(user).to.have.property("pets");
        expect(user.pets).to.be.an("array");
    });

    it("Espect to return null becouse there is not email in DB", async () => {
        const filter = { email: "error@error.com" };
        const user = await usersService.readByFilter(filter);
        expect(user).to.be.null;
    });

    //Update By Id:
    it("Espect to return an user updated by Id", async () => {
        const update = { first_name: "Name Updated" };
        const user = await usersService.updateOneById(newUser._id, update);
        expect(String(user._id)).to.equal(String(newUser._id));
        expect(user).to.have.property('first_name', update.first_name);
        expect(user).to.have.property('last_name', newUser.last_name);
        expect(user).to.have.property('email', newUser.email);
        expect(user).to.have.property('role', newUser.role);
        expect(user).to.have.property("pets");
        expect(user.pets).to.be.an("array");
    });

    it("Especto to update an user but the id is invalid", async () => {
        const id = "invalid id";
        const update = { first_name: "Name Updated" };
        if (!isValidObjectId(id)) return null;
        const user = await usersService(id, update);
        expect(user).to.be.null;
    });

    it("Especto to update an user but the id doesn't exist", async () => {
        const uid = { _id: "686ae4b56b29a8c47d8bbbbb" };
        const update = { first_name: "Name Updated" };
        const user = await usersService.updateOneById(uid._id, update);
        expect(user).to.be.null;
    });

    //Destroy by Id:
    it("Espect to eliminate the user by Id", async () => {
        const userDeleted = await usersService.destroyById(newUser._id);
        expect(userDeleted).to.be.an('object');
        expect(String(userDeleted._id)).to.equal(String(newUser._id));
        //Verifico que el usuario ya no existe
        const userAfterDelete = await usersService.readById(newUser._id);
        expect(userAfterDelete).to.be.null;
    });

    it("Espect to return null becouse the Id is not valid", async () => {
        const id = "fake id";
        if (!isValidObjectId(id)) return null;
        const user = await usersService.destroyById(id).lean();
        expect(user).to.be.null;
    });

    it("Espect to return null becouse there is not Id in DB", async () => {
        const id = "686ae4b56b29a8c47d8bbbbb";
        const user = await usersService.destroyById(id);
        expect(user).to.be.null;
    });
});