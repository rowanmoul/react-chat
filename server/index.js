const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 3001;
const path = require("path");
const crypto = require("crypto");

http.listen(port, () => {
    console.log("listening on port", port);
});

app.use(express.static(path.join(__dirname, "../build")));

const chatUsers = {};
let messages = [];

// listen to 'chat' messages
io.on("connection", socket => {
    const connectionInfo = {};

    console.log("Connected!");

    socket.on("message", msg => {
        if (msg.text.slice(0, 6) === "/nick ") {
            const oldNick = connectionInfo.nick;
            connectionInfo.nick = msg.text.split("/nick ")[1].trim().slice(0, 15);
            if (chatUsers[connectionInfo.nick] !== undefined) {
                connectionInfo.nick = oldNick;
            } else {
                chatUsers[connectionInfo.nick] = chatUsers[oldNick];
                delete chatUsers[oldNick];
                messages = messages.map(message => {
                    if (message.user === oldNick) message.user = connectionInfo.nick;
                    return message;
                });
                sendNick();
                broadcastChatLog();
            }
        } else if (msg.text.slice(0, 11) === "/nickcolor " || msg.text.slice(0, 12) === "/nickcolour ") {
            const colour = "#" + msg.text.trim().split(" ")[1].trim();
            chatUsers[connectionInfo.nick] = colour;
            sendNick();
        } else {
            const mess = {...msg, date: new Date(Date.now())};
            messages.push(mess);
            if (messages.length > 200) messages.shift();
            io.emit("message", {message: mess});
        }
    });

    socket.on("reconn", payload => {
        if (chatUsers[payload.nick] !== undefined) {
            makeNewNick();
            sendNick();
        } else {
            connectionInfo.nick = payload.nick;
            chatUsers[payload.nick] = payload.colour;
            sendNick();
        }
        sendChatLog();
    });

    socket.on("conn", () => {
        makeNewNick();
        sendNick();
        sendChatLog();
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
        delete chatUsers[connectionInfo.nick];
    });

    function makeNewNick() {
        connectionInfo.nick = crypto.randomBytes(15).toString("hex").slice(0, 15);
        chatUsers[connectionInfo.nick] = "#000000";
    }
    function sendNick() {
        socket.emit("nick", {nick: connectionInfo.nick, colour: chatUsers[connectionInfo.nick]});
        io.emit("userUpdate", {users: chatUsers});
    }
    function sendChatLog() {
        socket.emit("chatLog", {chatLog: messages});
    }
    function broadcastChatLog() {
        io.emit("chatLog", {chatLog: messages});
    }
});
