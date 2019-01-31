class Order {
  constructor(data) {
    this.priority = data.priority;
    // more instantiation
  }
  get priority() { return this.priority.toString(); }
  set priority(aString) { this.priority = new Priority(aString); }
}

// ex client code
highPriorityCount =
    orders.filter(o = > "high" == = o.priority || "rush" == = o.priority)
        .length;

class Priority {
  constructor(value) {
    this._value = value;
  }
  toString() { return this_.value; }
}
