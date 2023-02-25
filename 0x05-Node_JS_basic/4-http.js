/* eslint-disable jest/require-hook */
const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello Holberton School!');
  res.end();
});

module.exports = app;

app.listen(1245, () => {
  console.log('Server running on port 1245');
});
