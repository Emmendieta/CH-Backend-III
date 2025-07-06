const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
    case "memory":
        console.log("Logica pendiente de memory");
        {
            const { userManger, petManager, adoptionManager } = await import("./memory/dao.memory.js");
            dao = { userManger, petManager, adoptionManager };
        };
        break;
    case "fs":
        console.log("Logica pendiente de fs");
        {
            const { userManger, petManager, adoptionManager } = await import("./fs/dao.fs.js");
            dao = { userManger, petManager, adoptionManager };
        };
        break;
    default:
        {
            const { userManger, petManager, adoptionManager } = await import("./mongo/dao.mongo.js");
            dao = { userManger, petManager, adoptionManager }
        };
        break;
};

const { userManger, petManager, adoptionManager } = dao;

export {userManger, petManager, adoptionManager };
export default dao;