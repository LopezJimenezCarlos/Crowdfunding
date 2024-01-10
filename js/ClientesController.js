/* Método CRUD */

// Importa la conexión a la base de datos desde db.js
const { conexion } = require("./db.js");

const getClientes = (req, res) => {
    // Ejemplo: Consulta SQL para obtener todos los clientes
    const query = "SELECT * FROM clientes";

    // Realiza la consulta a la base de datos
    conexion.query(query, (err, resultados) => {
        if (err) {
            console.error("Error al obtener clientes:", err);
            // Envía una respuesta de error en formato JSON
            res.status(500).json({ error: "Error al obtener clientes" });
        } else {
            // Envía los resultados como JSON en caso de éxito
            res.json(resultados);
        }
    });
};

module.exports = {  
    getClientes
};

