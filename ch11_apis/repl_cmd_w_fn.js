// Most of the time, I just want to invoke a function and have it do its thing.
  // If that’s the case, and the function isn’t too complex, then a command object is more trouble than its worth and should be turned into a regular function.


class ChargeCalculator {
  constructor (customer, usage, provider){
    this._customer = customer;
    this._usage = usage;
    this._provider = provider;
  }
  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }
  get charge() {
    return this.baseCharge + this._provider.connectionCharge;
  }
}

monthCharge = new ChargeCalculator(customer, usage, provider).charge;
