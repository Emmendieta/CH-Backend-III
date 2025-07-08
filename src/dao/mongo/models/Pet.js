import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const collection = 'Pets';

const schema = new Schema({
    name: { type: String, required: true },
    specie: { type: String, required: true },
    birthDate: Date,
    adopted: { type: Boolean, default: false },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false,
        default: null
    },
    image: String
});

const petModel = model(collection, schema);

export default petModel;