// A utility company installs its services in sites.
class Site {
  get customer() {
    return (this._customer === "unknown") ? new UnknownCustomer() : this._customer;
  }

  // get name()           {...}
  // get billingPlan()    {...}
  // set billingPlan(arg) {...}
  // get paymentHistory() {...}
  get isUnknown() {return false;}
}

class UnknownCustomer {
  get isUnknown() {return true;}
  get name() {return "occupant";}
  get billingPlan()    {return registry.billingPlans.basic;}
  set billingPlan(arg) { /* ignore */ }
  get paymentHistory() {return new NullPaymentHistory();}
}

class NullPaymentHistory {
  get weeksDelinquentInLastYear() {return 0;}
}

function isUnknown(arg) {
  if (!(arg instanceof Customer || arg instanceof UnknownCustomer))
    throw new Error(`investigate bad value: <${arg}>`);
  return arg.isUnknown;
}

// Most of the time, a site has a customer, but sometimes there isn’t one.
// Someone may have moved out and I don’t yet know who, if anyone, has moved in.

// When this happens, the data record fills the customer field with the string “unknown”.

// Because this can happen, clients of the site need to be able to handle an unknown customer. Here are some example fragments:

// client 1
const aCustomer = site.customer;
// ... lots of intervening code ...
const customerName = aCustomer.name;
// client 2
const plan = aCustomer.billingPlan;
// client 3
aCustomer.billingPlan = newPlan;
// client 4
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;

// client 5
const name = ! isUnknown(aCustomer) ? aCustomer.name : "unknown occupant";
// change to
const name = aCustomer.isUnknown ? "unknown occupant" : aCustomer.name;

// Looking through the code base, I see many clients of the site object that have to deal with an unknown customer.
// Most of them do the same thing when they get one: They use “occupant” as the name, give them a basic billing plan, and class them as zero-weeks delinquent.
// This widespread testing for a special case, plus a common response, is what tells me it’s time for a Special Case Object.

// Creating a class like this is a fair bit of work for what is really a simple value. But for the example I gave, I had to make the class since the customer could be updated.
// If, however, I only read the data structure, I can use a literal object instead.
