class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() { return this._name; }
  get courses() { return this._courses; }
  set courses(aList) { this._courses = aList; }
}

class Course {
  constructor(name, isAdvanced) {
    this._name = name;
    this.isAdvanced = isAdvanced;
  }
  get name() { return this._name; }
  get isAdvanced() { return this._isAdvanced; }
}

numAdvancedCourses = aPerson.courses.filter(c = > c.isAdvanced).length;

// Person._courses is not properly encapsulated

// is ok
const basicCourseNames = readBasicCourseNames(filename);
aPerson.courses = basicCourseNames.map(name = > new Course(name, false));

// but this is problematic b/c Person has no ability to ctrl when the list is updated in this way
// -- the ref is encaps but the content of the field is not
for (const name of readBasicCourseNames(filename)) {
  aPerson.courses.push(new Course(name, false));
}
