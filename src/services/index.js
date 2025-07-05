import usersDao from "../dao/Users.dao.js";
import petsDao from "../dao/Pets.dao.js";
import Adoption from "../dao/Adoption.js";

import UserRepository from "../repository/UserRepository.js";
import PetRepository from "../repository/PetRepository.js";
import AdoptionRepository from "../repository/AdoptionRepository.js";

export const usersService = new UserRepository(usersDao);
export const petsService = new PetRepository(petsDao);
export const adoptionsService = new AdoptionRepository(new Adoption());
