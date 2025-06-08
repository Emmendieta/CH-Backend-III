import { Router } from "express";
import { generateMocksUsers, generateMockPets } from "../utils/mocking.utils.js" ;
import UserModel from "../dao/models/User.js";
import PetModel from "../dao/models/Pet.js";

const router = Router();

//GET Pets
router.get("/mockingpets", (req, res) => {
    const pets = generateMockPets(10) //Se van a a generar la cantidad necesiaria de mascotas
    res.json({ status: "success", pets });
});

//GET Users
router.get("/mockingusers", (req, res) => {
    const users = generateMocksUsers(50); // Se vana a generar la cantidad necesaria de usuarios
    res.json({ status: "success", users });
});

//POST
router.post("/generateData", async (req, res) => {
    const { users = 50, pets = 10 } = req.query;
    const mockUsers = generateMocksUsers(parseInt(users));
    const mockPets = generateMockPets(parseInt(pets));

    await UserModel.insertMany(mockUsers);
    await PetModel.insertMany(mockPets);

    res.json({ status: "success", insertedUsers: mockUsers.length, insertedPets: mockPets.length });
});

export default router;