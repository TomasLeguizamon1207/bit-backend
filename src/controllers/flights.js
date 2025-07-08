import Flight from "../models/flights.js";

export const createFlight = async (req, res) => {
    try {
        const newFlight = new Flight(req.body);
        await newFlight.save();
        res.status(201).json({ message: "Vuelo creado exitosamente", data: newFlight });
    } catch (error) {
        res.status(500).json({ message: "Error al crear vuelo", error });
    }
};

export const getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json({ message: "Lista de vuelos", data: flights });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener vuelos", error });
    }
};

export const getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (flight) {
            res.status(200).json({ message: "Vuelo encontrado", data: flight });
        } else {
            res.status(404).json({ message: "Vuelo no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al buscar vuelo", error });
    }
};

export const updateFlight = async (req, res) => {
    try {
        const updatedFlight = await Flight.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedFlight) {
            res.status(200).json({ message: "Vuelo actualizado correctamente", data: updatedFlight });
        } else {
            res.status(404).json({ message: "Vuelo no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar vuelo", error });
    }
};

export const deleteFlight = async (req, res) => {
    try {
        const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
        if (deletedFlight) {
            res.status(200).json({ message: "Vuelo eliminado correctamente", data: deletedFlight });
        } else {
            res.status(404).json({ message: "Vuelo no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar vuelo", error });
    }
};