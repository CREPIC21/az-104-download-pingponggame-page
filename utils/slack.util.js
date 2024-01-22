// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.SLACK_TOKEN, {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.DEBUG
});

async function publishMessage(id, text) {
    try {
        // Call the chat.postMessage method using the built-in WebClient
        const result = await client.chat.postMessage({
            // The token you used to initialize your app
            token: process.env.SLACK_TOKEN,
            channel: id,
            text: text
        });

        // Print result, which includes information about the message (like TS)
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}

// Export the publishMessage function
module.exports = {
    publishMessage
};