const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Try different ports if one is in use
const ports = [3000, 3001, 3002, 3003];

function startServer(ports) {
    const port = ports.shift();
    if (!port) {
        console.error('No available ports');
        process.exit(1);
    }

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying next port...`);
            startServer(ports);
        } else {
            console.error(err);
        }
    });
}

startServer([...ports]);
