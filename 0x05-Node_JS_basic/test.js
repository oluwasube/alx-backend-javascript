const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const headers = lines[0].split(',');
      const numStudents = lines.length - 1;
      const fieldCounts = {};

      lines.slice(1).forEach((line) => {
        const values = line.split(',');
        headers.forEach((header, i) => {
          const value = values[i].trim();
          if (fieldCounts[header]) {
            fieldCounts[header].count += value ? 1 : 0;
            fieldCounts[header].students.push(value);
          } else {
            fieldCounts[header] = {
              count: value ? 1 : 0,
              students: [value],
            };
          }
        });
      });

      console.log(`Number of students: ${numStudents}`);
      for (const field in fieldCounts) {
        if (Object.prototype.hasOwnProperty.call(fieldCounts, field)) {
          const count = fieldCounts[field].count;
          const students = fieldCounts[field].students.join(', ');
          console.log(`Number of students in ${field}: ${count}. List: ${students}`);
        }
      }
}