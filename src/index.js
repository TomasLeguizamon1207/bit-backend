import express from "express";
import morgan from "morgan";

const server = express();
const port = 4000;

server.use(morgan("dev"));
server.use(express.json());

const flights = [
  {
    id: 0,
    flightNumber: "EFY9090",
    origin: "SKBO",
    destination: "SKRG",
    departureTime: "2025-07-07T09:00:00Z",
    status: "scheduled"
  },
  {
    id: 1,
    flightNumber: "EFY9091",
    origin: "SKRG",
    destination: "SKBO",
    departureTime: "2025-07-07T15:00:00Z",
    status: "scheduled"
  }
];

server.get("/", (req, res) => {
  res.json({ message: "API works!" });
});

server.post("/flights", (req, res) => {
  const { flightNumber, origin, destination, departureTime, status } = req.body;

  if (!flightNumber || !origin || !destination || !departureTime || !status) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  const newFlight = {
    id: flights.length,
    flightNumber,
    origin,
    destination,
    departureTime,
    status
  };

  flights.push(newFlight);
  res.status(201).json({ message: "Vuelo agregado", data: newFlight });
});

server.get("/flights", (req, res) => {
  res.status(200).json({ message: "Lista de vuelos", data: flights });
});

server.get("/flights/:id", (req, res) => {
  const flightId = parseInt(req.params.id);
  const flight = flights.find(f => f.id === flightId);

  if (flight) {
    res.status(200).json({ message: "Vuelo encontrado", data: flight });
  } else {
    res.status(404).json({ message: "Vuelo no encontrado" });
  }
});

server.put("/flights/:id", (req, res) => {
  const flightId = parseInt(req.params.id);
  const flight = flights.find(f => f.id === flightId);

  if (flight) {
    const { flightNumber, origin, destination, departureTime, status } = req.body;
    if (flightNumber) flight.flightNumber = flightNumber;
    if (origin) flight.origin = origin;
    if (destination) flight.destination = destination;
    if (departureTime) flight.departureTime = departureTime;
    if (status) flight.status = status;

    res.status(200).json({ message: "Vuelo actualizado", data: flight });
  } else {
    res.status(404).json({ message: "Vuelo no encontrado" });
  }
});

server.delete("/flights/:id", (req, res) => {
  const flightId = parseInt(req.params.id);
  const index = flights.findIndex(f => f.id === flightId);

  if (index !== -1) {
    const deletedFlight = flights.splice(index, 1);
    res.status(200).json({ message: "Vuelo eliminado", data: deletedFlight });
  } else {
    res.status(404).json({ message: "Vuelo no encontrado" });
  }
});

server.listen(port, () => {
  console.log(`Servidor de vuelos corriendo en http://localhost:${port}`);
});