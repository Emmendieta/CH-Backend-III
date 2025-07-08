import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const collection = 'Users';

const schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pets',
        default: []
    }]
    /*     pets: {
            type: [
                { 
                    _id: { 
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Pets'
                    }
                }
            ],
            default: []
        } */
});

const userModel = model(collection, schema);

export default userModel;