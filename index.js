const http = require('http');

const servers = [
    { host: 'localhost', port: 3001 },
    { host: 'localhost', port: 3002 },
    { host: 'localhost', port: 3003 },
];

let current = 0;

const balancer = http.createServer((req, res) => {
    const target = servers[current];

    current = (current + 1) % servers.length;

    const proxy = http.request(
        {
            host: target.host,
            port: target.port,
            path: req.url,
            method: req.method,
            headers: req.headers,
        },
        (proxyRes) => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        }
    );

    proxy.on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Server unavailable", details: err.message }));
    });

    req.pipe(proxy);
});

balanceador.listen(3000, () => {
    console.log("Balanceador rodando em http://localhost:3000");
});
