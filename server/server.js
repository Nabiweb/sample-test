const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'data.txt');

// Save text to file
app.post('/', (req, res) => {
    try {
        const text = req.body.text;
        console.log('Received text:', text); // Log the incoming text
        if (!text) {
            console.warn('No text provided in request body');
            return res.status(400).send({ message: 'Text is required' });
        }
        fs.writeFileSync(FILE_PATH, text, 'utf8');
        console.log('Text saved successfully to', FILE_PATH);
        res.send({ message: 'Text saved successfully!' });
    } catch (error) {
        console.error('Error saving text:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Download the file
app.get('/download', (req, res) => {
    res.download(FILE_PATH, 'data.txt');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

