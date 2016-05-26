import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';

const PORT: Number = 3000;
let app: express.Express = express();
let server: http.Server = http.createServer(app);

let ioServer: SocketIO.Server = io(server);

// Routing
app.use(express.static(__dirname + '/../dist-client'));

server.listen(PORT, function (): void {
    console.log('Server listening at port %d', PORT);
});

ioServer.on('connection', function (socket: SocketIO.Socket): void {
    console.log('Socket connected');
    socket.on('serverName', function (): void {
        socket.emit('serverName', {
            name: 'expressjs'
        });
        console.log('Socket received serverName');
    });
});
