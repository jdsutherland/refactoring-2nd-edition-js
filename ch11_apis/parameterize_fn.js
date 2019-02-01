function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}

// new example
function baseCharge(usage) {
  if (usage < 0) return usd(0);
  const amount =
        + withinBand(usage, 0, 100) * 0.03
        + withinBand(usage, 100, 200) * 0.05
        + withinBand(usage, 200, Infinity) * 0.07
  return usd(amount);
}

function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

// Here the logic is clearly pretty similar—but is it similar enough to support creating a parameterized method for the bands?
// It is, but may be a touch less obvious than the trivial case above.

// When looking to parameterize some related functions, my approach is to take one of the functions and add parameters to it, with an eye to the other cases.
// With range-oriented things like this, usually the place to start is with the middle range.
// So I’ll work on middleBand to change it to use parameters, and then adjust other callers to fit.

