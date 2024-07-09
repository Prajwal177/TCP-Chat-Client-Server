const net = require('net');
const readline = require('readline');

clients = new Map();

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.write('Welcome to the group chat server!');
    socket.write('Please enter your username to get started\n');

    socket.once('data', (data)=> {
        const clientUsername = data.toString().trim();
        clients.set(socket, clientUsername)

        socket.write(`Hello ${clientUsername}\n`);
        broadcast(`User ${clientUsername} has joined the chat!\n`);

        socket.on('data', (data)=> {
            const message = data.toString().trim();
            const user = clients.get(socket);

            broadcast(`${user}: ${message}`, socket);

        });
    });

    socket.on('end', ()=> {
        const disconnectedUser = clients.get(socket);
        broadcast(`${disconnectedUser} has left the chat :(`, socket);
        clients.delete(socket);
        
    });

    socket.on('error', (err) => {
        console.log(`Error: ${err.message}`);
    });
});

function broadcast(message, senderSocket = null) {
    clients.forEach((userDetails, socket) => {
        if (socket !== senderSocket) {
            socket.write(message);
        }
    });
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})