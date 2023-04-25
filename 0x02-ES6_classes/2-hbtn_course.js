export default class HolbertonCourse {
  constructor(name, length, students) {
    this._name = this.checkType(name, 'string', 'Name must be a string');
    this._length = this.checkType(length, 'number', 'Length must be a number');
    this._students = this.checkType(students, Array.isArray, 'must be an array');
  }

  get name() {
    return this._name;
  }

  set name(n) {
    this._name = this.checkType(n, 'string', 'Name must be a string');
  }

  get length() {
    return this._length;
  }

  set length(size) {
    this._length = this.checkType(size, 'number', 'Length must be a number');
  }

  get students() {
    return this._students;
  }

  set students(stu) {
    this._students = this.checkType(stu, Array.isArray, 'must be an array');
  }

  checkType(value, type, errorMsg) {
    if (!type(value)) {
      throw new TypeError(errorMsg);
    }
    return value;
  }
}
