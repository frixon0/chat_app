import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let userConnected = 0;
let allsockets = [];
wss.on('connection', (socket) => {
    console.log("user connected");
    allsockets.push(socket);
    userConnected++;
    console.log("" + userConnected);
    socket.on('message', (data) => {
        allsockets.forEach(element => {
            element.send(data.toString());
        });
    });
});
//# sourceMappingURL=index.js.map