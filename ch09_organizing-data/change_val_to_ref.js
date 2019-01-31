// created via incoming JSON doc
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer(data.customer);
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

