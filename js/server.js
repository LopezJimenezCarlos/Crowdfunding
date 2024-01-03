const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    // Si la solicitud es para el directorio raíz, redirige a index.html
    if (filePath == './') {
        filePath = './index.html';

        // Realiza ambas consultas a la base de datos
        realizarConsultas(res);
    } else {
        // Maneja la solicitud para script.js y otros archivos estáticos
        serveStaticFile(res, filePath);
    }
});

function realizarConsultas(res) {
    let conexion = mysql.createConnection({
        host: "localhost",
        database: "stylehaven",
        user: "root",
        password: "",
    });

    // Creamos la conexión y vemos si hay error o se conecta correctamente
    conexion.connect(function (error) {
        if (error) {
            throw error;
        } else {
            console.log("Conexión exitosa");

            // Consulta 1: Obtener la suma total de la columna "cantidad"
            conexion.query("SELECT SUM(cantidad) AS totalDonado FROM donaciones", function (error, resultado1) {
                if (error) {
                    throw error;
                } else {
                    // Consulta 2: Obtener los donadores con las mayores donaciones
                    conexion.query("SELECT Nombre, Apellidos, SUM(cantidad) AS totalDonado FROM donaciones GROUP BY Nombre, Apellidos ORDER BY totalDonado DESC LIMIT 8", function (error, filas) {
                        if (error) {
                            throw error;
                        } else {
                            // Lee el contenido de index.html
                            fs.readFile('./index.html', 'utf-8', (err, content) => {
                                if (err) {
                                    res.writeHead(500);
                                    return res.end('Error loading index.html');
                                }

                                // Procesa los resultados de ambas consultas
                                const totalDonado = resultado1[0].totalDonado;
                                const donadores = filas.map((fila) => ({
                                    nombre: fila.Nombre,
                                    apellidos: fila.Apellidos,
                                    totalDonado: fila.totalDonado
                                }));

                                // Crea un contenedor con la clase "contenedor_donadores"
                                const contenedorDonadoresHTML = '<div class="contenedor_donadores">' +
                                    donadores.map((donador) => `
                                        <div class="donador">
                                            <p>${donador.nombre} ${donador.apellidos} = ${donador.totalDonado} €</p>
                                        </div>
                                    `).join('') +
                                    '</div>';

                                // Inserta los resultados de las consultas en el contenido de index.html
                                content = content.replace('{{DATA1}}', "Cantidad total donada: " + totalDonado + " €");
                                content = content.replace('{{DATA2}}', contenedorDonadoresHTML);

                                // Envía el contenido actualizado al cliente
                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.end(content, 'utf-8');

                                // Cierra la conexión a la base de datos después de completar las operaciones
                                conexion.end();
                            });
                        }
                    });
                }
            });
        }
    });
}

function serveStaticFile(res, filePath, contentType = 'application/octet-stream') {
    let extname = String(path.extname(filePath)).toLowerCase();

    let mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        
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
