const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    const headers = lines[0].trim().split(',');
    const students = lines
      .slice(1)
      .map((line) => line.trim().split(','))
      .filter((student) => student.length === headers.length && student.every((field) => field.trim() !== ''));
    const numStudents = students.length;
    console.log(`Number of students: ${numStudents}`);
    const fields = {};
    students.forEach((student) => {
      const field = student[headers.indexOf('field')];
      const firstname = student[headers.indexOf('firstname')];
      if (field in fields) {
        fields[field].push(firstname);
      } else {
        fields[field] = [firstname];
      }
    });
    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const numStudentsInField = fields[field].length;
        const studentsInField = fields[field].join(', ');
        console.log(`Number of students in ${field}: ${numStudentsInField}. List: ${studentsInField}`);
      }
    }
  } catch (error) {
    throw new Error(`Cannot load the database: ${error.message}`);
  }
}

module.exports = countStudents;
