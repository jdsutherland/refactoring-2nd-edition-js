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

// In that case, I find it better to use Extract Function (106) on the selection logic for which class to create, and make that the factory function.
function createPerson(aRecord) {
  let p;
  switch (aRecord.gender) {
    case 'M': p = new Male(aRecord.name); break;
    case 'F': p = new Female(aRecord.name); break;
    default: p = new Person(aRecord.name);
  }
  return p;
}

function loadFromInput(data) {
  const result = [];
  data.forEach(aRecord => {
    result.push(createPerson(aRecord));
  });
  return result;
}
