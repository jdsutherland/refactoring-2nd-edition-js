// The parameter list to a function should summarize the points of variability of that function, indicating the primary ways in which that function may behave differently.
// As with any statement in code, it’s good to avoid any duplication, and it’s easier to understand if the parameter list is short.

// If a call passes in a value that the function can just as easily determine for itself, that’s a form of duplication—one that unnecessarily complicates the caller which has to determine the value of a parameter when it could be freed from that work.

availableVacation(anEmployee, anEmployee.grade);
function availableVacation(anEmployee, grade) {
  // calculate vacation...
}
  // REPLACE PARAM W QUERY =>
availableVacation(anEmployee)
function availableVacation(anEmployee) {
  const grade = anEmployee.grade;
  // calculate vacation...
}

// When the parameter is present, determining its value is the caller’s responsibility; otherwise, that responsibility shifts to the function body.
// My usual habit is to simplify life for callers, which implies moving responsibility to the function body—but only if that responsibility is appropriate there.

// Example:
class Order {
  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice;
    let discountLevel;
    if (this.quantity > 100) discountLevel = 2;
    else discountLevel = 1;
    return this.discountedPrice(basePrice, discountLevel);
  }

  discountedPrice(basePrice, discountLevel) {
    switch (discountLevel) {
      case 1: return basePrice * 0.95;
      case 2: return basePrice * 0.9;
    }
  }
}
