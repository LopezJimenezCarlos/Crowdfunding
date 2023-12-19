const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    // Si la solicitud es para el directorio raíz, redirige a index.html
    if (filePath == './') {
        filePath = './index.html';

        // Realiza la consulta a la base de datos
        realizarConsulta(res);
    } else {
        // Maneja la solicitud para script.js y otros archivos estáticos
        serveStaticFile(res, filePath);
    }
});

function realizarConsulta(res) {
    let conexion = mysql.createConnection({
        host: "localhost",
        database: "test",
        user: "root",
        password: "",
    });

    // Creamos la conexion y vemos si hay error o se conecta correctamente
    conexion.connect(function (error) {
        if (error) {
            throw error;
        } else {
            console.log("Conexion exitosa");
        }
    });

    conexion.query("SELECT * FROM alumnado", function (error, filas) {
        if (error) {
            throw error;
        } else {
            // Lee el contenido de index.html
            fs.readFile('./index.html', 'utf-8', (err, content) => {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading index.html');
                }

                // Inserta los resultados de la consulta en el contenido de index.html
                const nombres = filas.map((fila) => fila.Nombre + ' '+ fila.Apellidos).join(', ');
               
                content = content.replace('{{DATA}}', nombres);
                
                
                // Envía el contenido actualizado al cliente
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            });
        }
    });

    conexion.end();
}

function serveStaticFile(res, filePath, contentType = 'application/octet-stream') {
    let extname = String(path.extname(filePath)).toLowerCase();

    let mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        // Puedes agregar más tipos de mime si necesitas servir otros tipos de archivos
    };

    contentType = mimeTypes[extname] || contentType;

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading ' + filePath);
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });
}

server.listen(3333, () => {
    console.log('Server listening on port 3333');
});
