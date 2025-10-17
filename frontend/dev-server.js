// = Epistyl frontend (ESM)
// -> Reads HOST and PORT from env
import http from 'node:http';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end('Epistyl frontend placeholder\n');
});

server.listen(PORT, HOST, () => {
  console.log(`Frontend listening on http://${HOST}:${PORT}`);
});
