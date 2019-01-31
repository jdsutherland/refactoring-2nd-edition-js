class Person {
  constructor() { this._telephoneNumber = new TelephoneNumber(); }

  get officeAreaCode() { return this._telephoneNumber.areaCode; }
  set officeAreaCode(arg) { this._telephoneNumber.areaCode = arg; }
  set officeAreaCode(arg) {
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber)
  }
  get officeNumber() { return this._telephoneNumber.number; }
  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg)
  }
}

class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }
  get areaCode()    {return this._areaCode;}
  set areaCode(arg) {this._areaCode = arg;}

  get number()    {return this._number;}
  set number(arg) {this._number = arg;}

  // js has no builtin support for repl a ref-based equality w/ value based one
  equals(other) {
    if (!(other instanceof TelephoneNumber)) return false;
    return this.areaCode === other.areaCode &&
      this.number === other.number;
  }
}

// 1. Make TelephoneNumber immutatable
// 2. Make complete Value Object by adding value based equality
// (be sure to test)
it('telephone equals', function() {
  assert(        new TelephoneNumber("312", "555-0142")
         .equals(new TelephoneNumber("312", "555-0142")));
});
