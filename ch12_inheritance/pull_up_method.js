class Employee extends Party {
}

class Department extends Party {
}

class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
  get monthlyCost() {
    throw new SubclassResponsibilityError();
  }
}

// I look at both classes and see that they refer to the monthlyCost property which isn’t defined on the superclass, but is present in both subclasses.
// Since I’m in a dynamic language, I’m OK; if I were in a static language, I’d need to define an abstract method on Party.

// That completes the refactoring, but does leave a question.
// annualCost calls monthlyCost, but monthlyCost doesn’t appear in the Party class.
// It all works, because JavaScript is a dynamic language—but there is value in signaling that subclasses of Party should provide an implementation for monthlyCost, particularly if more subclasses get added later on.
  // A good way to provide this signal is a trap method:

