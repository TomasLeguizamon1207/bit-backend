import { Schema, model } from "mongoose";

const flightSchema = new Schema({
    flightNumber: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { versionKey: false, timestamps: true });

export default model("Flight", flightSchema);