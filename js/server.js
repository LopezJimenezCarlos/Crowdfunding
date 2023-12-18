const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath == './') {
        filePath = '../index.html';
    }

    let extname = String(path.extname(filePath)).toLowerCase();
    let mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        // puedes agregar más tipos de mime si necesitas servir otros tipos de archivos
    };

    let contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading ' + filePath);
        }
        res.writeHead(200, {'Content-Type': contentType});
        res.end(content, 'utf-8');
    });
});

server.listen(3333, () => {
    console.log('Server listening on port 3333');
});
