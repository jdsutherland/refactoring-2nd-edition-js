class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() { return this._name; }

  // ensure nobody modifies the list without using addCourse/removeCourse
  get courses() { return this._courses.slice(); }

  // should the API need a setter, ensure it puts a copy of the collection in the field
  set courses(aList) { this._courses = aList.slice(); }

  addCourse(aCourse) {
    this._courses.push(aCourse);
  }

  removeCourse(aCourse, fnIfAbsent = () => {throw new RangeError();}) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1) fnIfAbsent();
    else this._courses.splice(index, 1);
  }
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
  aPerson.addCourse(new Course(name, false));
}
