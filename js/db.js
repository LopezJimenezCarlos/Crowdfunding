/*conexion a servidor*/
const mysql = require('mysql');

let conexion = mysql.createConnection({
    host: "localhost",
    database: "stylehaven",
    user: "root",
    password: "",
});
conexion.connect(function (err) {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos con el ID ' + conexion.threadId);
});

module.exports = {
    conexion
};