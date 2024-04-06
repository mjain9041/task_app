const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // assuming you have a folder named uploads

const app = express();

// Import worker thread
const { Worker } = require('worker_threads');

app.post("/upload", upload.single("datasheet"), (req, res) => {
    const worker = new Worker('./worker/worker.js', { workerData: req.file.path });

    worker.on('message', (message) => {
        console.log('Worker completed:', message);
        res.send('CSV data uploaded successfully!');
    });

    worker.on('error', (error) => {
        console.error('Worker error:', error);
        res.status(500).send('Error uploading CSV data');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
