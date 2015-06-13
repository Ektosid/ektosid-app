var https = require('https');
var fs = require('fs');

var options = {
  //key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('/Users/Snap/Desktop/Sippi/Docs/WebApp/NewSenior/js/certtt.p12')
};

https.createServer(function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);