const { PERSISTENCE } = process.env;
import crypto from "crypto";
import { createHash } from "../helpers/hash.helper.js";

class UserDTO {
    constructor(data) {
        if (PERSISTENCE !== "mongo") {
            this._id = crypto.randomBytes(12).toString("hex");
        };
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role || 'user';
        this.pets = data.pets || [];
        if (PERSISTENCE !== "mongo") {
            this.createAt = new Date();
            this.updateAt = new Date();
            this.password = createHash(data.password);
        };
    }
};

export default UserDTO;