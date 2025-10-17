// = Epistyl backend (ESM)
// -> Reads PORT from env
import http from 'node:http';

const PORT = Number(process.env.PORT || 5000);

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end('Epistyl backend placeholder\n');
});

server.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
