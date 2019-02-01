// Most of the time, I just want to invoke a function and have it do its thing.
  // If that’s the case, and the function isn’t too complex, then a command object is more trouble than its worth and should be turned into a regular function.


class ChargeCalculator {
  constructor (customer, usage, provider){
  }
  get charge(customer, usage, provider) {
    const baseCharge = customer.baseRate * usage;
    return baseCharge + provider.connectionCharge;
  }
}

function charge(customer, usage, provider) {
  return new ChargeCalculator(customer, usage, provider)
                      .charge(customer, usage, provider);
}

monthCharge = charge(customer, usage, provider);
