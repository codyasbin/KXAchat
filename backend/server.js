const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// REST API Endpoint
app.get("/api", (req, res) => {
  res.send("API is running!");
});

// Start HTTP server
app.listen(PORT, () => {
  console.log(`HTTP server is running on http://localhost:${PORT}`);
});

// WebSocket Server Setup
const wss = new WebSocket.Server({ port: WS_PORT });

const clients = [];

wss.on("connection", (socket) => {
  const clientId = generateUniqueId();
  clients.push({ id: clientId, socket });

  console.log(`Client connected: ${clientId}`);

  // Send welcome message
  socket.send(
    JSON.stringify({ type: "system", message: `Welcome! Your ID is ${clientId}` })
  );

  // Handle incoming messages
  socket.on("message", (data) => {
    const message = JSON.parse(data.toString());
    console.log(`Message from ${clientId}:`, message);

    // Broadcast to all clients except sender
    broadcastMessage(clientId, message);
  });

  // Handle client disconnect
  socket.on("close", () => {
    console.log(`Client disconnected: ${clientId}`);
    removeClient(clientId);
  });

  socket.on("error", (error) => {
    console.error(`Error with client ${clientId}:`, error);
  });
});

console.log(`WebSocket server is running on ws://localhost:${WS_PORT}`);

// Helper Functions
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

function broadcastMessage(senderId, message) {
  const payload = JSON.stringify({ senderId, ...message });
  clients.forEach((client) => {
    if (client.id !== senderId) {
      client.socket.send(payload);
    }
  });
}

function removeClient(clientId) {
  const index = clients.findIndex((client) => client.id === clientId);
  if (index !== -1) {
    clients.splice(index, 1);
  }
}
