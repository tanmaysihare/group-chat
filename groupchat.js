const http = require('http');

const login = require('./login');
const chatting = require('./chatting');

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/login' || url === '/loggedIn') {
        login.handler(req, res);
    } else if (url === '/' || url === '/chat') {
        chatting.handler(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(4000);
