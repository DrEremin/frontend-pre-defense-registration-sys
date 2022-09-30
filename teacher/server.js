const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    const ext = path.extname(req.url);
    let contentType = 'text/html';

    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
        default:
            contentType = 'text/html';
    }

    console.log(req.url);
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type' : contentType });
                res.end('Error');
            } else {
                res.writeHead(200, { 'Content-Type' : contentType });
                res.end(data);
                }
            }
        );
    }
);
server.listen(3001, () => {
        console.log('Server has been started...');
    }
);
