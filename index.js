require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { publishMessage } = require('./utils/slack.util');

const DEFAULT_PORT = process.env.PORT || 5000;

// initialize express.
const app = express();

// Initialize variables.
let port = DEFAULT_PORT;

// Configure morgan module to log all requests.
app.use(morgan('dev'));

// Setup app folders.
// app.use(express.static('App'));

// Set up a route for index.html
app.get('*', (req, res) => {
    // publishMessage(process.env.SLACK_CHANNEL_ID, "Hello world from utils");
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Set up a route to handle the Slack message trigger
app.post('/trigger-slack-message', express.json(), (req, res) => {
    const message = req.body;
    const textMessage = `📥 ${message.text}`;

    // Call the Slack function from the utils file
    publishMessage(process.env.SLACK_CHANNEL_ID, textMessage);

    // Send a response
    res.status(200).send('Slack message triggered successfully');
});

// Start the server.
app.listen(port);
console.log(`Listening on port ${port}...`);