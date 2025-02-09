# React.js Socket.IO v4 Client

This is a simple React.js client that connects to a Socket.IO v4 server using WebSockets. Find the Go/Golang server code here `https://github.com/rackovlab/go-socket-server`

## Features

- Establishes a connection to a Socket.IO server
- Utilize socket.io-client v4.8.1
- Sends messages (both string and JSON object) to the server

## Installation

1. Clone the repository

   ```sh
   git clone https://github.com/rackovlab/reactjs-socket-io-v4-client.git
   cd your-repo-name
   ```

2. Install dependencie

   ```sh
   npm install
   ```

3. Start the React application
   ```sh
   npm start
   ```

## Usage

- Ensure the Socket.IO server is running at ws://localhost:3300 (or update the SERVER_URL in App.js to match your server address).
- The application connects to the server on load and listens for messages on the test event.
- Use the buttons to emit messages to the server.
