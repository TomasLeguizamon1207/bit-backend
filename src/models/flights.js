import { Schema, model } from "mongoose";

const flightSchema = new Schema({
  flightNumber: {
    type: String,
    required: true,
    uppercase: true, 
    validate: {
      validator: (v) => /^EFY[A-Z0-9]{1,4}$/.test(v),
      message: (props) =>
        `${props.value} no es un callsign. Debe empezar con EFY y tener de 4 a 7 caracteres.`,
    },
  },
  origin: {
    type: String,
    required: true,
    uppercase: true, 
    validate: {
      validator: (v) => /^[A-Z]{4}$/.test(v),
      message: (props) =>
        `${props.value} no es un origen válido. Debe ser un codigo ICAO con 4 letras válido.`,
    },
  },
  destination: {
    type: String,
    required: true,
    uppercase: true, 
    validate: {
      validator: (v) => /^[A-Z]{4}$/.test(v),
      message: (props) =>
        `${props.value} no es un destino válido. Debe ser un codigo ICAO con 4 letras válido.`,
    },
  },
  departureTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["departured", "scheduled", "arrived", "delayed"],
  },
}, { timestamps: true });

export default model("Flight", flightSchema);