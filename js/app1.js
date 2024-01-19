const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Para gestionar errores
const app = express();

const port = 4000;
const bodyParser = require('body-parser');


// Configurar CORS
app.use(cors()); // Esto permite solicitudes de cualquier origen. 
app.use(bodyParser.json());
// Crear conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'stylehaven'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }else{
    console.log('Conectado a la base de datos');
    }
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());


app.get('/donaciones', (req, res) => {
    const query = 'SELECT SUM(Donacion) AS suma_total FROM clientes';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor');
        } else {
          
            const sumaTotal = results[0].suma_total || 0; // Accede al resultado de la suma_total
            res.json({ suma_total: sumaTotal });
            
        }
    });
});
app.get('/donadores', (req, res) => {
    const query = 'SELECT * FROM clientes WHERE  Donacion > 0 ORDER BY Donacion DESC LIMIT 10';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor');
        } else {
            
        var donadores = results 
        Donjsn = res.json(donadores);
        }
    });
});

app.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;
    const query = 'SELECT * FROM clientes WHERE Correo = ? AND Password = ?';

    db.query(query, [correo, contrasena], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error en el servidor');
        } else {
            if (results.length > 0) {
                res.send('Inicio de sesión exitoso');
            } else {
                res.status(401).send('Correo electrónico o contraseña incorrectos');
            }
        }
    });
});

app.post('/registrar', (req, res) => {
    const { nombre, apellidos, correo, contrasena } = req.body;
    console.log('Datos del formulario:', req.body);
    const query = `
        INSERT INTO clientes (Nombre, Apellidos, Correo, Password )
        VALUES ( ?, ?, ?, ?);
    `;
    db.query(query, [nombre, apellidos, correo, contrasena], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al registrar el usuario');
        } else {
            res.status(201).send('Usuario registrado con éxito');
            
        }
    });
});
app.get('/success', (req, res) => {
    // Lógica para manejar una donación exitosa
    res.send('¡Donación exitosa!');
});

app.get('/cancel', (req, res) => {
    // Lógica para manejar una donación cancelada
    res.send('Donación cancelada');
});


app.post('/procesar_donacion', (req, res) => {
    const { cantidad, metodoPago, comentario, correoUsuario } = req.body;

    // Insertar la donación en la tabla de donaciones
    const queryDonaciones = `
        INSERT INTO donaciones (Cantidad, MetodoPago, Comentario, CorreoUsuario)
        VALUES (?, ?, ?, ?);
    `;

    db.query(queryDonaciones, [cantidad, metodoPago, comentario, correoUsuario], (err, resultDonaciones) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al procesar la donación');
        } else {
            // Actualizar la cantidad donada en la tabla de clientes
            const queryClientes = `
                UPDATE clientes
                SET Donacion = Donacion + ?
                WHERE Correo = ?;
            `;

            db.query(queryClientes, [cantidad, correoUsuario], (errClientes, resultClientes) => {
                if (errClientes) {
                    console.error(errClientes);
                    res.status(500).send('Error al actualizar la cantidad donada en la tabla de clientes');
                } else {
                    res.status(201).json({ mensaje: 'Donación procesada con éxito' });
                }
            });
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});