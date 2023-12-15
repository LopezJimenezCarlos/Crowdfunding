let mysql = require("mysql")

//Creamos objeto de conexión
let conexion = mysql.createConnection({
    host: "localhost",
    database: "test",
    user: "root",
    password: "",
})

// Creamos la conexion y vemos is hay error o se conecta correctamente
conexion.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("Conexion exitosa")
    }
})

conexion.query("SELECT * FROM alumnado", function(error, filas){
    if(error){
        throw error
    }else{
        console.log(filas)
        // Aquí enviarías 'filas' al cliente
    }
})

conexion.end()
