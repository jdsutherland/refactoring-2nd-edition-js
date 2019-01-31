// created via incoming JSON doc
class Order {
  constructor(data) {
    this._number = data.number;
    // coupled to global Repository -- can inject via constructor if desired
    this._customer = registerCustomer(data.customer);
    // load other data
  }
  get customer() {return this._customer;}
}

class Customer {
  constructor(id) {
    this._id = id;
  }
  get id() {return this._id;}
}

// The customer object I create this way is a value. If I have five orders that refer to the customer ID of 123, I’ll have five separate customer objects.
// Any change I make to one of them will not be reflected in the others.
// Should I want to enrich the customer objects, perhaps by gathering data from a customer service, I’d have to update all five customers with the same data.
// Having duplicate objects like this always makes me nervous—it’s confusing to have multiple objects representing the same entity, such as a customer.

// This problem is particularly awkward if the customer object is mutable, which can lead to inconsistencies between the customer objects.

// If I want to use the same customer object each time, I’ll need a place to store it.
// Exactly where to store entities like this will vary from application to application, but for a simple case I like to use a repository object.
let _repositoryData;

export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map();
}

export function registerCustomer(id) {
  if (! _repositoryData.customers.has(id))
    _repositoryData.customers.set(id, new Customer(id));
  return findCustomer(id);
}

export function findCustomer(id) {
  return _repositoryData.customers.get(id);
