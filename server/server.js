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
app.post('https://test5-omega-ten.vercel.app/api/save', (req, res) => {
    try {
        const text = req.body.text;
        if (!text) {
            return res.status(400).send({ message: 'Text is required' });
        }
        fs.writeFileSync(FILE_PATH, text, 'utf8');
        res.send({ message: 'Text saved successfully!' });
    } catch (error) {
        console.error('Error saving text:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Download the file
app.get('/api/download', (req, res) => {
    res.download(FILE_PATH, 'data.txt');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

