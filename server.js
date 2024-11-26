const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Route to generate a random number
server.get('/do_a_random', (req, res) => {
    res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Serve static files from "public" folder
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Port setup
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}
server.listen(port, () => console.log(`Ready on localhost:${port}!`));

// Mad Lib form submission handler
server.post('/ITC505/lab-7', (req, res) => {
    const { noun, verb, adjective, adverb, pluralNoun } = req.body;

    if (!noun || !verb || !adjective || !adverb || !pluralNoun) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields.</p>
            <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
        `);
        return;
    }

    const madLib = `
        In a ${adjective} kingdom far away, there was a ${noun} who loved to ${verb} ${adverb}.
        One day, they discovered a treasure chest full of ${pluralNoun} that changed their life forever!
    `;

    res.send(`
        <h1>Mad Lib Story</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html">Create Another Mad Lib story</a>
    `);
});
