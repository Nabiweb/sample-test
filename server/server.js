const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// In-memory storage for text
let storedText = '';

// Save text to memory
app.post('/api/save', (req, res) => {
    const text = req.body.text;
    storedText = text; // Save text in memory
    res.send({ message: 'Text saved successfully!' });
});

// Download the text as a file
app.get('/api/download', (req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename="data.txt"');
    res.send(storedText); // Send the stored text as the file content
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
