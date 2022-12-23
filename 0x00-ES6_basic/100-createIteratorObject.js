export default function createIteratorObject(report) {
  const departments = Object.keys(report.allEmployees);
  let currentDepartment = 0;
  let currentEmployee = 0;

  return {
    next() {
      if (currentDepartment >= departments.length) {
        return { done: true };
      }

      const department = departments[currentDepartment];
      const employees = report.allEmployees[department];
      if (currentEmployee >= employees.length) {
        currentEmployee = 0;
        currentDepartment++;
      }

      return { value: employees[currentEmployee++] };
    },
  };
}
