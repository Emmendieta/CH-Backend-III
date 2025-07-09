import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const collection = 'Adoptions';

const schema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pets'
    }
});

const adoptionModel = model(collection, schema);

export default adoptionModel;