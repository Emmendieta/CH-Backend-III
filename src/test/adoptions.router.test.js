import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("Adoptions Router login as admin", () => {
    let agent;
    const validUserId = "686ae4b56b29a8c47d8bd8b0";
    const validPetId = "686ae4b66b29a8c47d8bd8ec";
    const validAid = "686e9d6d51c481c87f84566a";
    const invalidId = "invalid-id";
    const notFoundId = "000000000000000000000000";

    before(async () => {
        agent = request.agent(app);
        await agent
            .post("/api/auth/login")
            .send({ email: "emmendieta12@gmail.com", password: "1234" })
            .expect(200);
    });

    function removeAnsiCodes(str) {
        return str.replace(/\u001b\[.*?m/g, '');
    }

    //GET ALL ADOPTSIONS:
    it("GET /api/adoptions -> List of Adoptsion, posibles status: 200, 400, 404 or 500", async () => {
        const response = await agent.get('/api/adoptions');
        expect(response.status).to.be.oneOf([200, 400, 404, 500]);
        expect(response.body).to.have.property('method');
        expect(response.body).to.have.property('url');
        expect(response.body.url).to.equal('/api/adoptions');

        if (response.status === 200) {
            expect(response.body).to.have.property('response');
            expect(response.body.response).to.be.an('array');
            expect(response.body).to.have.property('message').that.equals('Succes!!!');
        } else if (response.status === 400) {
            expect(response.body).to.have.property('message').that.includes('Client Error');
        } else if (response.status === 404) {
            expect(response.body).to.have.property('message').that.includes('Not Found');
        } else if (response.status === 500) {
            expect(response.body).to.have.property('message').that.includes('Internal Server Error');
        }
    });

    //GET ADOTPION BY ID:
    it("GET /api/adoptions/:aid should return 200, 400, 404 or 500 depending on :aid value", async () => {
        //400:
        let aid = validAid;
        let res = await agent.get("/api/adoptions/invalid-id");
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an("object");
        expect(removeAnsiCodes(res.body.error)).to.include("Invalid Adoption Id");
        //404:
        res = await agent.get(`/api/adoptions/000000000000000000000000`);
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an("object");
        expect(removeAnsiCodes(res.body.error)).to.include("Adoption not Found!");
        //200 o 404 (en caso de que jsuto se borre)
        res = await agent.get(`/api/adoptions/${aid}`);
        expect(res.status).to.be.oneOf([200, 404]);
        expect(res.body).to.be.an("object");
        if (res.status === 200) {
            expect(res.body).to.have.property("message").that.includes("Succes");
            expect(res.body).to.have.property("response").that.is.an("object");
            expect(res.body.response).to.have.property("_id");
        } else {
            expect(removeAnsiCodes(res.body.error)).to.include("Adoption not Found!");
        }
        //500:
        res = await agent.get("/api/adoptions/force-error");
        if (res.status === 500) {
            expect(res.body).to.be.an("object");
            expect(removeAnsiCodes(res.body.error)).to.include("Internal Server Error");
        }
    });

    //CREATE ADOPTION:
    it("POST /api/adoptions/:uid/:pid - tests with different expected responses", async () => {
        const testCases = [
            {
                uid: "invalidUserId",
                pid: validPetId,
                expectedStatus: 400,
                expectedMessage: "Invalid user Id"
            },
            {
                uid: validUserId,
                pid: "invalidPetId",
                expectedStatus: 400,
                expectedMessage: "Invalid pet Id"
            },
            {
                uid: "64ff8f4b1c9d440000000000", // userId not valid
                pid: validPetId,
                expectedStatus: 404,
                expectedMessage: "User not Found"
            },
            {
                uid: validUserId,
                pid: "64ff8f4b1c9d440000000001", // petID not valid
                expectedStatus: 404,
                expectedMessage: "Pet not Found"
            },
            {
                uid: validUserId,
                pid: "686ae4b66b29a8c47d8bd8ea", // pet alredy adopted
                expectedStatus: 400,
                expectedMessage: "Pet is alredy adopted"
            },
            {
                uid: validUserId,
                pid: validPetId,
                expectedStatus: 201,
                expectedMessage: "Created!!!"
            }
        ];
        for (const { uid, pid, expectedStatus, expectedMessage } of testCases) {
            it(`should return ${expectedStatus} - ${expectedMessage}`, async () => {
                const res = await agent.post(`/api/adoptions/${uid}/${pid}`);
                expect(res.status).to.equal(expectedStatus);
                // Validar que el mensaje exista
                expect(res.body).to.have.property("message");
                expect(res.body.message).to.include(expectedMessage);
                if (expectedStatus === 201) {
                    expect(res.body.response).to.have.property("_id");
                }
            });
        }
    });

    //GET ADOPTION BY USER ID AND PET ID:
    it("GET /api/adoptions/:uid/:pid should return 200, 400, 404 or 500 depending on input", async () => {

        const existingPetIdWithoutAdoption = "686ae4b66b29a8c47d8bd8eb";
        //400:
        let res = await agent.get(`/api/adoptions/${invalidId}/${validPetId}`);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error");
        expect(removeAnsiCodes(res.body.error)).to.include("Invalid user Id");

        //400:
        res = await agent.get(`/api/adoptions/${validUserId}/${invalidId}`);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error");
        expect(removeAnsiCodes(res.body.error)).to.include("Invalid pet Id");

        //404:
        res = await agent.get(`/api/adoptions/${notFoundId}/${validPetId}`);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
        expect(removeAnsiCodes(res.body.error)).to.include("User not Found!");

        //404:
        res = await agent.get(`/api/adoptions/${validUserId}/${notFoundId}`);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
        expect(removeAnsiCodes(res.body.error)).to.include("Pet not Found!");

        //404:
        const someUserId = validUserId;
        res = await agent.get(`/api/adoptions/${someUserId}/${existingPetIdWithoutAdoption}`);
        if (res.status === 404) {
            expect(res.body).to.have.property("error");
            expect(removeAnsiCodes(res.body.error)).to.include("Adoption not Found!");
        } else if (res.status === 200) {
            // Si llegase a existir la adopción
            expect(res.body).to.have.property("response");
            expect(res.body.response).to.be.an("object");
        }

        //500:
        res = await agent.get(`/api/adoptions/force-error/force-error`);
        if (res.status === 500) {
            expect(res.body).to.have.property("error");
            expect(removeAnsiCodes(res.body.error)).to.include("Internal Server Error");
        }
    });

    //DELETE ADOPTION:
    it("DELETE /api/adoptions/:aid - should handle various responses", async () => {
        //400:
        let res = await agent.delete(`/api/adoptions/${validAid}`).send({ uid: invalidId, pid: validPetId });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error");
        expect(removeAnsiCodes(res.body.error)).to.include("Invalid user Id");

        //400:
        res = await agent.delete(`/api/adoptions/${validAid}`).send({ uid: validUserId, pid: invalidId });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error");
        expect(removeAnsiCodes(res.body.error)).to.include("Invalid pet Id");

        //400:
        res = await agent.delete(`/api/adoptions/${invalidId}`).send({ uid: validUserId, pid: validPetId });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error");
        expect(removeAnsiCodes(res.body.error)).to.include("Invalid adpotion Id");

        //404:
        res = await agent.delete(`/api/adoptions/${validAid}`).send({ uid: notFoundId, pid: validPetId });
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
        expect(removeAnsiCodes(res.body.error)).to.include("User not Found");

        //404:
        res = await agent.delete(`/api/adoptions/${validAid}`).send({ uid: validUserId, pid: notFoundId });
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
        expect(removeAnsiCodes(res.body.error)).to.include("Pet not Found");

        //404:
        res = await agent.delete(`/api/adoptions/${notFoundId}`).send({ uid: validUserId, pid: validPetId });
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
        expect(removeAnsiCodes(res.body.error)).to.include("Adoption not Found");

        //200 OK:
        const createRes = await agent.post(`/api/adoptions/${validUserId}/${validPetId}`);
        expect(createRes.status).to.equal(201);
        const aidToDelete = createRes.body.response._id;

        //Borrar la adopción recién creada
        const deleteRes = await agent.delete(`/api/adoptions/${aidToDelete}`)
            .send({ uid: validUserId, pid: validPetId });
        expect(deleteRes.status).to.equal(200);
        expect(deleteRes.body).to.have.property("message");
        expect(deleteRes.body.message).to.include("Succes!!!");

        //500:
        const errorRes = await agent.delete(`/api/adoptions/force-error`)
            .send({ uid: validUserId, pid: validPetId });
        if (errorRes.status === 500) {
            expect(errorRes.body).to.have.property("error");
            expect(removeAnsiCodes(errorRes.body.error)).to.include("Internal Server Error");
        }
    });

    //UPDATE ADOPTION:
    it("PUT /api/adoptions/:aid - should handle all updateAdiptionById scenarios", async () => {
        // Datos válidos para tests
        let aid = validAid;
        let oldUid = validUserId;
        let oldPid = validPetId;

        // Para casos donde necesites nuevos valores, reemplazá con IDs válidos de tu DB de pruebas
        let newUid = validUserId; // otro user válido
        let newPid = validPetId; // otra mascota válida

        // 400: Invalid new user Id
        let res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: oldUid,
            pet: oldPid,
            newOwner: "invalidId",
            newPet: newPid
        });
        expect(res.status).to.equal(400);
        expect(removeAnsiCodes(res.body.error)).to.include("Invalid new user Id");

        // 400: Invalid new pet Id
        res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: oldUid,
            pet: oldPid,
            newOwner: newUid,
            newPet: "invalidId"
        });
        expect(res.status).to.equal(400);
        expect(removeAnsiCodes(res.body.error)).to.include("Invalid new pet Id");

        // 400: Invalid adoption Id
        res = await agent.put(`/api/adoptions/invalidAid`).send({
            owner: oldUid,
            pet: oldPid,
            newOwner: newUid,
            newPet: newPid
        });
        expect(res.status).to.equal(400);
        expect(removeAnsiCodes(res.body.error)).to.include("Invalid adoption Id");

        // 400: Invalid old user Id
        res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: "invalidOldUserId",
            pet: oldPid,
            newOwner: newUid,
            newPet: newPid
        });
        expect(res.status).to.equal(400);
        expect(removeAnsiCodes(res.body.error)).to.include("Invalid old user Id");

        // 400: Invalid old pet Id
        res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: oldUid,
            pet: "invalidOldPetId",
            newOwner: newUid,
            newPet: newPid
        });
        expect(res.status).to.equal(400);
        expect(removeAnsiCodes(res.body.error)).to.include("Invalid old pet Id");

        // 404: Adoption not found
        res = await agent.put(`/api/adoptions/${notFoundId}`).send({
            owner: oldUid,
            pet: oldPid,
            newOwner: newUid,
            newPet: newPid
        });
        expect(res.status).to.equal(404);
        expect(removeAnsiCodes(res.body.error)).to.include("Adoption not found!");

        // 404: Old user not found
        res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: notFoundId,
            pet: oldPid,
            newOwner: newUid,
            newPet: newPid
        });
        expect(res.status).to.equal(404);
        expect(removeAnsiCodes(res.body.error)).to.include("Adoption not found!");

        // 404: New user not found
        res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: oldUid,
            pet: oldPid,
            newOwner: notFoundId,
            newPet: newPid
        });
        expect(res.status).to.equal(404);
        expect(removeAnsiCodes(res.body.error)).to.include("Adoption not found!");

        // 404: Old pet not found
        res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: oldUid,
            pet: notFoundId,
            newOwner: newUid,
            newPet: newPid
        });
        expect(res.status).to.equal(404);
        expect(removeAnsiCodes(res.body.error)).to.include("Adoption not found!");

        // 404: New pet not found
        res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: oldUid,
            pet: oldPid,
            newOwner: newUid,
            newPet: notFoundId
        });
        expect(res.status).to.equal(404);
        expect(removeAnsiCodes(res.body.error)).to.include("Adoption not found!");

        // 404: User and pet are already associated (no cambios)
        res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: oldUid,
            pet: oldPid,
            newOwner: oldUid,
            newPet: oldPid
        });
        expect(res.status).to.equal(404);
        expect(removeAnsiCodes(res.body.error)).to.include("Adoption not found!");

        // CASOS EXITOSOS --> SE COMENTAN LOS CASOS EXITOSOS PORQUE SE TIENE QUE IR MODIFICANDO SEGUN LAS ADOPTIONS QUE ESTAN EN LA BD:
/*         aid = "686ec50e62b82cbb36b33048";
        oldUid = "686ec8783867545a4a792f7a";
        oldPid = "686ae4b66b29a8c47d8bd8ea";
        newPid = "686ae4b66b29a8c47d8bd8eb";

        // Caso 1: mismo usuario, diferente mascota
        res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: oldUid,
            pet: oldPid,
            newOwner: oldUid,
            newPet: newPid
        });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message");
        expect(typeof res.body.message).to.equal("string");
        expect(res.body.message).to.include("Adoption updated");

        // Caso 2: diferente usuario, misma mascota
        res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: oldUid,
            pet: oldPid,
            newOwner: newUid,
            newPet: oldPid
        });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message");
        expect(typeof res.body.message).to.equal("string");
        expect(res.body.message).to.include("Adotion updated");

        // Caso 3: diferente usuario y diferente mascota
        res = await agent.put(`/api/adoptions/${aid}`).send({
            owner: oldUid,
            pet: oldPid,
            newOwner: newUid,
            newPet: newPid
        });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message");
        expect(typeof res.body.message).to.equal("string");
        expect(res.body.message).to.include("Adoption updated"); */
    });
});