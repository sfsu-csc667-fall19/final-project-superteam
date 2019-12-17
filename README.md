## Available Scripts (Local Development Environment)

Before you are ready to run this application, please open MangoDB and Redis in local environment. 

Then, you will need to run the following commands consecutively：

### `npm install`

It will take a while until all the dependency packages are properly installed

### `sudo node gateway.js`

"sudo" is recommended. For some local development environment, error will thrown without "sudo"

### `node messenger.js`

You need to run this command so that this service can be linked to mangoDB to communicate message data.

### `node user.js`

To keep this service on to ensure user login and register functions.

### `node websocket.js`

To run websocket.js to make sure the real-time updating between different users.

### `npm run start`

This is the final step to initialize this React application.




