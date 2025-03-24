const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// In-memory storage (Not recommended for production)
let storedText = '';

// Save text to memory
app.post('/api/save', (req, res) => {
    const text = req.body.text;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    storedText = text; 
    res.json({ message: 'Text saved successfully!' });
});

// Download the text as a file
app.get('/api/download', (req, res) => {
    if (!storedText) {
        return res.status(404).json({ error: 'No text available for download' });
    }
    res.setHeader('Content-Disposition', 'attachment; filename="data.txt"');
    res.send(storedText);
});

// Export as a serverless function
module.exports = app;

