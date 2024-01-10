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
            // La respuesta puede contener varias filas, pero como estamos usando SUM, debería haber una sola fila con la suma total
            const sumaTotal = results[0].suma_total || 0; // Accede al resultado de la suma_total
            res.json({ suma_total: sumaTotal });
            console.log(sumaTotal)
        }
    });
});
app.get('/donadores', (req, res) => {
    const query = 'SELECT * FROM clientes ORDER BY Donacion DESC LIMIT 10';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor');
        } else {
            // La respuesta puede contener varias filas, pero como estamos usando SUM, debería haber una sola fila con la suma total
        var donadores = results // Accede al resultado de la suma_total
        Donjsn = res.json(donadores);
        console.log(donadores)
        }
    });
});
app.post('/login', (req, res) => {
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
  
    const query = 'SELECT * FROM clientes WHERE Correo = ? AND Password = ?';
    db.query(query, [correo, contrasena], (err, results) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Error en el servidor' });
      } else {
        if (results.length > 0) {
          res.json({ success: true, message: 'Inicio de sesión exitoso', correo: correo });
        } else {
          res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
      }
    });
  });

  app.post('/login', (req, res) => {
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;

    const query = 'SELECT * FROM clientes WHERE correo = ? AND contrasena = ?';
    db.query(query, [correo, contrasena], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error en el servidor' });
        } else {
            if (results.length > 0) {
                res.json({ success: true, message: 'Inicio de sesión exitoso', correo: correo });
            } else {
                res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
            }
        }
    });
});


// Ruta para registrar un nuevo usuario
/*app.post('/registrar', (req, res) => {
    const { saludo, nombre, apellidos, correo, contrasena } = req.body;
    const query = `
        INSERT INTO usuarios (saludo, nombre, apellidos, correo_electronico, contrasena)
        VALUES (?, ?, ?, ?, ?);
    `;
    db.query(query, [saludo, nombre, apellidos, correo, contrasena], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al registrar el usuario');
        } else {
            res.status(201).send('Usuario registrado con éxito');
        }
    });
});
*/
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
/*
// LOGIN
app.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;
    const query = 'SELECT * FROM usuarios WHERE correo_electronico = ? AND contrasena = ?';

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
*/
