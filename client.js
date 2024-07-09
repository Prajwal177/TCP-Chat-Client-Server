const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const client = net.createConnection({ port: 3000 }, () => {
    console.log('Connected to chat server!');

    rl.question('Please enter your username: ', (username) => {
        client.write(username);
        rl.setPrompt(`${username}: `);
        rl.prompt();

        rl.on('line', (input) => {
            client.write(input);
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