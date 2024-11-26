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
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mad Lib Game</title>
    <link rel="stylesheet" href="madlib.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }

        h1, p, a {
            text-align: center;
            color: #333;
        }

        a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px;
            background-color: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }

        a:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Mad Lib Story</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/index.html">Create Another Mad Lib story</a>
</body>
</html>

    `);
});
