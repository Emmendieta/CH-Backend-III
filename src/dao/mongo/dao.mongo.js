import userModel from "../mongo/models/User.js";
import petModel from "../mongo/models/Pet.js";
import adoptionModel from "../mongo/models/Adoption.js";

class DaoMongo {
    constructor(model) {
        this.model = model;
    }
    createOne = async (data) => await this.model.create(data);
    readAll = async (filter) => await this.model.find(filter).lean();
    readById = async (id) => await this.model.findOne({ _id: id }).lean();
    readByFilter = async (filter) => await this.model.findOne(filter).lean();
    updateById = async (id, data) => await this.model.findByIdAndUpdate(id, data, { new: true }).lean();
    destroyById = async (id) => await this.model.findByIdAndDelete(id);
};

const userManger = new DaoMongo(userModel);
const petManager = new DaoMongo(petModel);
const adoptionManager = new DaoMongo(adoptionModel);

export { userManger, petManager, adoptionManager };