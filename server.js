const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware to parse incoming request bodies
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Route to generate a random number
server.get('/do_a_random', (req, res) => {
    res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Serve static files from the "public" folder
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Port setup: Use the environment variable PORT or default to 8080 for local development
const port = process.env.PORT || 8080; // Dynamically assigns the port for deployment (Render) or local development
server.listen(port, () => console.log(`Ready on localhost:${port}!`));

// Mad Lib form submission handler
server.post('/ITC505/lab-7', (req, res) => {
    const { noun, verb, adjective, adverb, pluralNoun } = req.body;

    // Ensure all fields are filled
    if (!noun || !verb || !adjective || !adverb || !pluralNoun) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields.</p>
            <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
        `);
        return;
    }

    // Generate the Mad Lib story
    const madLib = `
        In a ${adjective} kingdom far away, there was a ${noun} who loved to ${verb} ${adverb}.
        One day, they discovered a treasure chest full of ${pluralNoun} that changed their life forever!
    `;

    // Send the generated story back to the user
    res.send(`
        <h1>Mad Lib Story</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html">Create Another Mad Lib story</a>
    `);
});
