const { PERSISTENCE } = process.env;

class AdoptionDTO {
    constructor(data) {
        if(PERSISTENCE !== "mongo") {
            this.id = data.id;
        };
        this.owner = data.owner;
        this.pet = data.pet;
        if(PERSISTENCE !== "mongo") {
            this.createdAt = new Date();
            this.updateAt = new Date();
        };
    };
};

export default AdoptionDTO;