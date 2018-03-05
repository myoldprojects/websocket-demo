'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000 //get the port# from the env, or default it to 3000

const server = express()
    .use(express.static(path.join(__dirname, 'public'))) //serve all static files in the public folder
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));

const wss = new SocketServer({server});

//handle and response to different events: 'connection', 'close', and 'error'
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => {
        console.log('Client disconnected')
    });
    ws.on('error', (err) => { //this will handle when client closes the browser
        console.log('Oops, Client disconnected');
    })
});

//push the time string to client in a set interval
setInterval(() => {
    wss.clients.forEach((client) => {
        client.send(new Date().toTimeString());
    });
}, 1000);

