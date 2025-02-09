import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SERVER_URL = "ws://localhost:3300"; // Replace with your server URL

function App() {
  const [message, setMessage] = useState("");
  const [mSocket, setMSocket] = useState();

  // Establish connection to the Socket.IO server
  useEffect(() => {
    const socket = io(SERVER_URL, {
      transports: ["websocket"], // Ensures WebSocket is used for communication
      withCredentials: true, // Allows sending credentials (cookies, authentication headers, etc.)
    });

    // Event listener for successful connection
    socket.on("connect", () => {
      console.log("Connection success");
      setMSocket(socket); // Save socket instance to state for further use
    });

    // Event listener for connection errors
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    // Listen for "test" events from the server
    socket.on("test", (data) => {
      setMessage(data); // Update state with received message
      console.log("Received msg:", data);
    });

    // Cleanup function to disconnect from the server when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to emit a string message to the server on the "test" event
  const emitString = () => {
    mSocket.emit("test", "hello world");
  };

  // Function to emit a JSON-stringified object to the server on the "test" event
  const emitObj = () => {
    const chatMessage = { foo: "bar" };
    mSocket.emit("test", JSON.stringify(chatMessage));
  };

  // Function to emit a string message to the server on the "test" event
  const emitStringBroadcast = () => {
    mSocket.emit("test-broadcast", "hello world");
  };

  return (
    <div>
      <h1>Socket.IO React Client</h1>
      <p>Message from server: {message}</p>
      <div>
        <p>
          Click to emit string :{" "}
          <button onClick={emitString}>Emit string</button>
        </p>
        <p>
          Click to emit stringified js object :{" "}
          <button onClick={emitObj}>Emit obj</button>
        </p>
        <p>
          Click to emit broadcast to room clients :{" "}
          <button onClick={emitStringBroadcast}>Emit Broadcast</button>
        </p>
      </div>
    </div>
  );
}

export default App;
