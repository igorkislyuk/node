const net = require('net');
const events = require('events');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscribtions = {};


channel.on('join', function (id, client) {
    this.clients[id] = client;
    this.subscribtions[id] = function (senderId, message) {
        if (id !== senderId) {
            this.clients[id].write(message);
        }
    };

    this.on('broadcast', this.subscribtions[id]);
});

// channel.on('broadcast', function (message) {
//     for (var client in this.clients) {
//         console.log('client' + client.toString());
//     }
// });

channel.on('leave', function (id) {
    channel.removeListener('broadcast', this.subscribtions[id]);

    channel.emit('broadcast', id, id + " has left the chat.\n");
});

const server = net.createServer(function (client) {
    const id = client.remoteAddress + ':' + client.remotePort;
    channel.emit('join', id, client);

    client.on('data', function(data) {
        data = data.toString();
        if (data === 'end\r\n') {
            client.end();
        }
        channel.emit('broadcast', id, data);
    });

    client.on('close', function () {
        channel.emit('leave', id);
    });
});

server.listen(8888);