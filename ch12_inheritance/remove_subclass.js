// A subclass that does too little incurs a cost in understanding that is no longer worthwhile.
// When that time comes, it’s best to remove the subclass, replacing it with a field on its superclass.

class Person {
  constructor(name, genderCode) {
    this._name = name;
    this._genderCode = genderCode || "X";
  }
  get name()    {return this._name;}
  get genderCode() {return this._genderCode;}
  // snip
  get isMale() {return "M" === this._genderCode;}
}

class Male extends Person {
  get genderCode() {return "M";}
}

class Female extends Person {
  get genderCode() {return "F";}
}

// client
const numberOfMales = people.filter(p => p.isMale).length;

function createPerson(aRecord) {
  switch (aRecord.gender) {
    case 'M': return new Person(aRecord.name, "M");
    case 'F': return new Person(aRecord.name, "F");
    default:  return new Person(aRecord.name);
  }
}

function loadFromInput(data) {
  return data.map(aRecord => createPerson(aRecord));
}

