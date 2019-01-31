class Order {
  constructor(data) {
    this.priority = data.priority;
    // more instantiation
  }
  get priority() { return this.priority; }
  set priority(aString) { this.priority = aString; }
}

// ex client code
highPriorityCount =
    orders.filter(o = > "high" == = o.priority || "rush" == = o.priority)
        .length;
