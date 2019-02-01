function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}

// new example
function baseCharge(usage) {
  if (usage < 0) return usd(0);
  const amount =
        bottomBand(usage) * 0.03
        + middleBand(usage) * 0.05
        + topBand(usage) * 0.07;
  return usd(amount);
}

function bottomBand(usage) {
  return Math.min(usage, 100);
}

function middleBand(usage) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}

function topBand(usage) {
  return usage > 200 ? usage - 200 : 0;
}

// Here the logic is clearly pretty similar—but is it similar enough to support creating a parameterized method for the bands?
// It is, but may be a touch less obvious than the trivial case above.

// When looking to parameterize some related functions, my approach is to take one of the functions and add parameters to it, with an eye to the other cases.
// With range-oriented things like this, usually the place to start is with the middle range.
// So I’ll work on middleBand to change it to use parameters, and then adjust other callers to fit.

