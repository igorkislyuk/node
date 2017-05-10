const net = require('net');
const events = require('events');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscribtions = {};
channel.setMaxListeners(50);


channel.on('join', function (id, client) {
    this.clients[id] = client;
    const welcome = "Welcome!\n" +
        'Guests online: ' + this.listeners('broadcast').length;
    client.write(welcome);
    this.subscribtions[id] = function (senderId, message) {
        if (id !== senderId) {
            this.clients[id].write(message);
        }
    };

    this.on('broadcast', this.subscribtions[id]);
});

channel.on('leave', function (id) {
    channel.removeListener('broadcast', this.subscribtions[id]);

    channel.emit('broadcast', id, id + " has left the chat.\n");
});

channel.on('shutdown', function () {
    channel.emit('broadcast', '', 'Chat has shut down.\n');
    channel.removeAllListeners('broadcast');
});

const server = net.createServer(function (client) {
    const id = client.remoteAddress + ':' + client.remotePort;
    channel.emit('join', id, client);

    client.on('data', function(data) {
        data = data.toString();
        processCommand(data, client, channel);
        channel.emit('broadcast', id, data);
    });

    client.on('close', function () {
        channel.emit('leave', id);
    });
});

function processCommand(command, client, channel) {
    if (command === 'end\r\n') {
        client.emit('end');
    } else if (command === 'shutdown\r\n') {
        channel.emit('shutdown');
    }
}

server.listen(8888);