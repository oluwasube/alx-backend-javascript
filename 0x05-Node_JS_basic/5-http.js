const http = require('http');
const { countStudents } = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    countStudents(process.argv[2])
      .then(({ studentCount, students }) => {
        const studentList = Object.entries(students)
          .map(([field, list]) => `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`)
          .join('\n');
        const responseText = `This is the list of our students\nNumber of students: ${studentCount}\n${studentList}\n`;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(responseText);
      })
      .catch((error) => {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error\n');
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found\n');
  }
});
/* eslint-disable jest/require-hook */
app.listen(1245);
module.exports = app;
