const { PERSISTENCE } = process.env;
import crypto from "crypto";

class PetsDTO {
    constructor(data) {
        if (PERSISTENCE !== "mongo") {
            this.id = crypto.randomBytes(12).toString("hex");
        };
        this.name = data.name;
        this.specie = data.specie;
        this.birthDate = data.birthDate;
        this.adopted = data.adopted;
        this.owner = data.owner || null;
        this.image = data.image
        if (PERSISTENCE !== "mongo") {
            this.createdAt = new Date();
            this.updateAt = new Date();
        }
    };
};

export default PetsDTO;