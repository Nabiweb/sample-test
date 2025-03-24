const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'data.txt');

// Save text to file
app.post('/api/save', (req, res) => {
    const text = req.body.text;
    fs.writeFileSync(FILE_PATH, text, 'utf8');
    res.send({ message: 'Text saved successfully!' });
});

// Download the file
app.get('/api/download', (req, res) => {
    res.download(FILE_PATH, 'data.txt');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
