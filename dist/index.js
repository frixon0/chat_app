import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let userConnected = 0;
let allsockets = [];
wss.on('connection', (socket, req) => {
    console.log("user connected");
    let urlstring = req.url ?? '';
    const parsedUrl = new URL(urlstring, `http://${req.headers.host}`);
    const roomId = parsedUrl.searchParams.get('roomId') ?? 'default';
    allsockets.push([socket, roomId]);
    userConnected++;
    console.log("" + userConnected);
    socket.on('message', (data) => {
        allsockets.forEach(element => {
            if (element[1] == roomId) {
                if (element[0].readyState == WebSocket.OPEN) {
                    element[0].send(data.toString());
                }
            }
        });
    });
    socket.on('close', () => {
        allsockets = allsockets.filter(s => s[0] != socket);
        userConnected--;
        console.log("user disconnected");
        console.log(allsockets.length);
    });
});
//# sourceMappingURL=index.js.map