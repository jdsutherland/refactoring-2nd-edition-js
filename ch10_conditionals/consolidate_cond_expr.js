function disabilityAmount(anEmployee) {
  if (isNotEligableForDisability())
    return 0;
  // compute the disability amount
}

function isNotEligableForDisability() {
  return ((anEmployee.seniority < 2)
    || (anEmployee.monthsDisabled > 12)
    || (anEmployee.isPartTime));
}
