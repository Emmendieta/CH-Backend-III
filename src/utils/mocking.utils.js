import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const roles = ['user', 'admin'];

export const generateMocksUsers = (count = 1) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push( {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('coder123', 10),
            role: roles[Math.floor(Math.random() * roles.length)],
            pets: []
        });
    };
    return users;
};

export const generateMockPets = (count = 1) => {
    const pets = [];
    for (let i = 0; i < count; i++) {
        pets.push({
            name: faker.person.firstName(),
            specie: faker.animal.type(),
            birthDate: faker.date.birthdate(),
            owner: new mongoose.Types.ObjectId(),
            image: "/img/1671549990926-coderDog.jpg",
            adopted: false
        });
    };
    return pets;
}