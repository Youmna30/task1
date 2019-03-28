const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, (err) => {
   console.log('server started on port: '+port);
});
