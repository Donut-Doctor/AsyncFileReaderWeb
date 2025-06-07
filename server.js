const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3003;

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    const indexPath = path.join(__dirname, 'index.html');
    const html = await fs.readFile(indexPath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.url === '/read') {
    try {
      const filePath = path.join(__dirname, 'example.txt');
      const data = await fs.readFile(filePath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error reading file.');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
