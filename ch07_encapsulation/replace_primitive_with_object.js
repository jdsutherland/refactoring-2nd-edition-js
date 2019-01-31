class Order {
  constructor(data) {
    this.priority = data.priority;
    // more instantiation
  }
  get priorityString() { return this.priority.toString(); }

  get priority() { return this.priority; }
  set priority(aString) { this.priority = new Priority(aString); }
}

// ex client code
highPriorityCount =
    orders.filter(o = > "high" === o.priorityString || "rush" === o.priorityString)
        .length;

class Priority {
  constructor(value) {
    // allow clients of Order to use the setter with a priority instance
    if (value instanceof Priority) return value;
    // this skips the further validation logic:

    if (Priority.legalValues().includes(value)) {
      this._value = value;
    } else {
      throw new Error(`<${value}> is invalid for Priority`);
    }
  }

  toString() { return this_.value; }
  get _index() { return Priority.legalValues().findIndex(s => s === this._value); }

  static legalValues() {return ['low', 'normal', 'high', 'rush'];}
  equals(other) {return this._index === other._index;}
  higherThan(other) {return this._index > other._index;}
  lowerThan(other) {return this._index < other._index;}
}

// after, client becomes
highPriorityCount = orders.filter(o => o.priority.higherThan(new Priority('low')
  .length;
