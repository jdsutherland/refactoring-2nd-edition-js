// Providing a setting method indicates that a field may be changed.
  // If I don’t want that field to change once the object is created, I don’t provide a setting method (and make the field immutable).
  // That way, the field is set only in the constructor, my intention to have it not change is clear, and I usually remove the very possibility that the field will change.

// This leads to the only call to a setting method being from the constructor.
  // I prefer to remove the setting method to make it clear that updates make no sense after construction.

// Another case is where the object is created by clients using creation script rather than by a simple constructor call.
  // Such a creation script starts with the constructor call followed by a sequence of setter method calls to create the new object.
  // Once the script is finished, we don’t expect the new object to change some (or even all) of its fields.
  // The setters are only expected to be called during this initial creation.
    // In this case, I’d get rid of them to make my intentions clearer.

// Example:
class Person {
  constructor(id) {
    this._id = id;
  }

  get name()    {return this._name;}
  set name(arg) {this._name = arg;}
  get id()    {return this._id;}
}

const martin = new Person("1234");
martin.name = "martin";
// The name of a person may change after it’s created, but the ID does not.
// To make this clear, I want to remove the setting method for ID.

// I still need to set the ID initially, so I’ll use Change Function Declaration to add it to the constructor.
