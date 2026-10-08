const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("A Ghana Life user connected");

  ws.send(
    JSON.stringify({
      type: "welcome",
      message: "Welcome to Ghana Life 🇬🇭",
    })
  );

  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    // Send the message to all connected users
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("A Ghana Life user disconnected");
  });
});

console.log("Ghana Life WebSocket server running on port 8080");