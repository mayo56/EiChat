// Import statments
import express from "express";
import { Server } from "socket.io";
import http from "node:http";

// Create server
const app = express(); // App API REST
const server = http.createServer(app); // Server HTTP
const io = new Server(server); // io Socket Server

//========================<<>>==
app.get("/", (req, res) => {
    res.send("Yayy !!");
});



/////---------------------------------------<< WS >>
import fs from "node:fs";
import { eventWS } from "./types/eventType";
const events = fs.readdirSync((__dirname + "/events")).filter(file => file.endsWith(".ts"));

/**
 * Handler WebSocket
 */
io.on("connection", async (socket) => {
    for (let event of events) {
       const file = require(__dirname + "/events/" + event).default as eventWS;
        if (file.off) {
            socket.off(file.name, (args) => file.ws(io, socket, args));
        } else {
            socket.on(file.name, (args) => file.ws(io, socket, args));
        };
    };
});

// Server listening
server.listen(9999, () => {
    console.log('[SYSTEM] Server: on.');
});