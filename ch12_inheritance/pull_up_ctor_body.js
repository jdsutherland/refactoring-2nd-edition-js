class Party {
  constructor(name) {
    this._name = name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  // rest of class...
}

class Department extends Party {
  constructor(name, staff){
    super(name);
    this._staff = staff;
  }
  // rest of class...
}
