const fs = require('fs');

const loginHandler = ((req, res) => {
    const url = req.url;
    const method = req.method;

   if (url === '/login' && method === 'GET') {
        res.write('<html>');
        res.write('<head><title>Login Page</title></head>');
        res.write('<body>');
        res.write('<form action="/loggedIn" method="POST"><label>Username:</label><input type="text" name="username"/><button type="submit">Login</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    } else if (url === '/loggedIn' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            fs.appendFile('message.txt', username + '\n', err => {
                if (err) {
                    console.error("Error appending username to file:", err);
                    res.statusCode = 500;
                    res.end("Internal Server Error");
                } else {
                    console.log("Username: ", username);
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                }
            });
        });
    }
    
});
exports.handler = loginHandler;