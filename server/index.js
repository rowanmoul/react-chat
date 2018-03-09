const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const path = require("path");

http.listen(port, () => {
    console.log("listening on port", port);
});

app.use(express.static(path.join(__dirname, "/public")));

// listen to 'chat' messages
io.on("connection", socket => {
    socket.on("chat", msg => {
        io.emit("chat", msg);
        console.log(msg);
    });
});

io.on("disconnect", () => {
    console.log("User Disconnected");
});
