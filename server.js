var http = require('http');
var ip;

var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      ip = ip + ';' + iface.address;
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
      ip = ip + '; ' + iface.address;
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
      ip = ip + '; ' + iface.address;
    }
    ++alias;
  });
});

var handleRequest = function(request, response) {
    console.log('Received request for URL: ' + request.url);
    response.writeHead(200);
    response.end('Hello Kubernetes V2<br>New push to see what happens with the container label in docker build.  ip=' + ip);
};

var www = http.createServer(handleRequest);
www.listen(8082);