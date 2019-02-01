// A subclass that does too little incurs a cost in understanding that is no longer worthwhile.
// When that time comes, it’s best to remove the subclass, replacing it with a field on its superclass.

class Person {
  constructor(name) {
    this._name = name;
  }
  get name()    {return this._name;}
  get genderCode() {return "X";}
  // snip
}

class Male extends Person {
  get genderCode() {return "M";}
}

class Female extends Person {
  get genderCode() {return "F";}
}

// client
const numberOfMales = people.filter(p => p instanceof Male).length;

// If that’s all that a subclass does, it’s not really worth having.
// But before I remove these subclasses, it’s usually worth checking to see if there’s any subclass-dependent behavior in the clients that should be moved in there.
  // In this case, I don’t find anything worth keeping the subclasses for.

// Whenever I want to change how I represent something, I try to first encapsulate the current representation to minimize the impact on any client code.
// When it comes to creating subclasses, the way to encapsulate is to use Replace Constructor with Factory Function (334).

  // In this case, there’s a couple of ways I could make the factory.
function createPerson(name) {
  return new Person(name);
}
function createMale(name) {
  return new Male(name);
}
function createFemale(name) {
  return new Female(name);
}

// But although that’s the direct choice, objects like this are often loaded from a source that uses the gender codes directly.
function loadFromInput(data) {
  const result = [];
  data.forEach(aRecord => {
    let p;
    switch (aRecord.gender) {
      case 'M': p = new Male(aRecord.name); break;
      case 'F': p = new Female(aRecord.name); break;
      default: p = new Person(aRecord.name);
    }
    result.push(p);
  });
  return result;
}
