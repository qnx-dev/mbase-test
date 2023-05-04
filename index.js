var net = require('net');
var count = 0;

var server = net.createServer(function(socket) {

socket.pipe(socket);  //With this uncommented I get an ECONNRESET exception after 14299 writes with it commented it hangs after 41020 writes

socket.on('data', function(data) {

    console.info(count++);  //This makes it occur sooner
	//count++;
    console.info(data)

	//maxConnections is not the issue
	server.getConnections(function(err, count) {
		console.info('count = ' + count);
	});
});

socket.on('close', function() {
    console.info('Socket close');
});

socket.on('error', function(err) {
    console.error('Socket error: ' + err + ', count = ' + count);
	console.error(new Error().stack);
});
});

server.listen(52275, '127.0.0.1');