const http = require('http');
const fs = require('fs');
const path = require('path');

const FILE_PATH = 'example.txt'; // Path to the text file

// Function to get the last modified time of the file
function getLastModifiedTime(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats.mtime);
            }
        });
    });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Handle OPTIONS request (for CORS preflight)
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle GET request
    if (req.method === 'GET' && req.url === '/last-modified') {
        try {
            const lastModifiedTime = await getLastModifiedTime(FILE_PATH);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(lastModifiedTime.toString());
        } catch (error) {
            console.error('Error:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
