const fs = require('fs');

const chattingHandler = ((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        if (method === 'GET') {
            fs.readFile('message.txt', 'utf8', (err, data) => {
                res.write('<html>');
                res.write('<head><title>Chat Page</title></head>');
                res.write('<body>');
                res.write('<h1>Messages:</h1>');
                res.write(`<p>${data}</p><br/>`);
                res.write('<form action="/chat" method="POST"><label>Enter message:</label><input type="text" name="message"/><button type="submit">Send</button></form>');
                res.write('</body>');
                res.write('</html>');
                return res.end();
            });
        }
    } else if (url === '/chat' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.appendFile('message.txt', message + '\n', err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
});
exports.handler = chattingHandler;