const http = require('http');
const fs = require('fs');
const path = require('path');
const querys = require('./querys');
const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    // Si la solicitud es para el directorio raíz, redirige a index.html
    if (filePath == './') {
        filePath = './index.html';

        // Realiza ambas consultas a la base de datos
        querys.realizarConsultas(res);
    } else {
        // Maneja la solicitud para script.js y otros archivos estáticos
        serveStaticFile(res, filePath);
    }
});



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

