const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const cors = require('cors');  // Import the 'cors' module

const app = express();
const port = 3000;

app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());

const urlDatabase = {};

app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;
    const shortId = shortid.generate();

    urlDatabase[shortId] = longUrl;

    res.json({ shortId });
});

app.get('/:shortId', (req, res) => {
    const { shortId } = req.params;
    const longUrl = urlDatabase[shortId];

    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
