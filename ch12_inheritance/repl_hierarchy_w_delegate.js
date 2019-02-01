function createBird(data) {
  switch (data.type) {
    case 'NorweigianBlueParrot':
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
  }
}

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }
  selectSpeciesDelegate(data) {
    switch(data.type) {
      case 'EuropeanSwallow':
        return new EuropeanSwallowDelegate();
      case 'AfricanSwallowDelegate':
        return new AfricanSwallowDelegate(data);
      case 'NorwegianBlueParrotDelegate':
        return new NorwegianBlueParrotDelegate(data, this);
      default: return null;
    }
  }

  get name()    {return this._name;}
  get plumage() {
    if (this._speciesDelegate)
      return this._speciesDelegate.plumage;
    else
      return this._plumage || "average";
  }
  get airSpeedVelocity() {
    return this._speciesDelegate ? this._speciesDelegate.airSpeedVelocity : null;
  }
}

class EuropeanSwallowDelegate {
  get airSpeedVelocity() {return 35;}
  get plumage() {
    return this._bird._plumage || "average";
  }
}

class AfricanSwallowDelegate {
  constructor(data) {
    this._numberOfCoconuts = data.numberOfCoconuts;
  }
  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
  get plumage() {
    return this._bird._plumage || "average";
  }
}

class NorwegianBlueParrotDelegate {
  constructor(data) {
    this._bird = bird;
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get plumage() {
    if (this._voltage > 100) return "scorched";
    else return this._bird._plumage || "beautiful";
  }
  get airSpeedVelocity() {
    return (this._isNailed) ? 0 : 10 + this._voltage / 10;
  }
}

// The system will shortly be making a big difference between birds tagged in the wild and those tagged in captivity.
// That difference could be modeled as two subclasses for Bird: WildBird and CaptiveBird.

// However, I can only use inheritance once, so if I want to use subclasses for wild versus captive, I’ll have to remove them for the species.
