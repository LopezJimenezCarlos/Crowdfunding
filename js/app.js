// app.js
const express = require("express");
const cors = require("cors");
const db = require("./db.js");
const routes = require("./routes.js");

const app = express();

// Usa la conexión a la base de datos en tus rutas
app.use((req, res, next) => {
    req.db = db.conexion;
    next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes); // Cambiado de '/routes' a '/api' para mayor claridad

app.listen(3333, () => {
    console.log("Server listening on port 3333");
});
