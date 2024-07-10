const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let myUsername;

const client = net.createConnection({ port: 3000 }, () => {
    console.log('Connected to chat server!');

    rl.question('Enter your username: ', (username) => {
        myUsername = username;
        client.write(myUsername);

        rl.prompt();
        rl.on('line', (myText) => {
            client.write(`${myUsername}: ${myText}`);
            rl.prompt();
        });
    });
});

client.on('data', (data) => {
    console.log(data.toString());  
});

client.on('end', () => {
    console.log('Disconnected from the server');
});

client.on('error', (err) => {
    console.log(`Error: ${err.message}`);
});