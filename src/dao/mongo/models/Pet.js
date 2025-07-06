import mongoose from "mongoose";

const collection = 'Pets';

const schema = new mongoose.Schema({
    name: { type: String, require: true },
    specie: { type: String, require: true },
    birthDate: Date,
    adopted: { type: Boolean, default: false },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
    },
    image: String
});

const petModel = mongoose.model(collection, schema);

export default petModel;