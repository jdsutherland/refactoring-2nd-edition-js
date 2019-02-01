## Replace Type Code With Polymorphism

### Software systems often need to represent different kinds of a similar thing.
I may classify employees by their job type (engineer, manager, salesman), or orders by their priority (rush, regular).

### My first tool for handling this is some kind of type code field—depending on the language, that might be an enum, symbol, string, or number.
Often, this type code will come from an external service that provides me with the data I’m working on.

### Most of the time, such a type code is all I need. But there are a couple of situations where I could do with something more, and that something more are subclasses.
There are two things that are particularly enticing about subclasses:

1. They allow me to use polymorphism to handle conditional logic.
> I find this most helpful when I have several functions that invoke different behavior depending on the value of the type code. With subclasses, I can apply Replace Conditional with Polymorphism (272) to these functions.

2. When I have fields/methods that are only valid for particular values of a type code (e.g. such as a sales quota that’s only applicable to the “salesman” type code), I can then create the subclass and apply Push Down Field (361).
> While I can include validation logic to ensure a field is only used when the type code has the correct value, using a subclass makes the relationship more explicit.

### When using Replace Type Code with Subclasses, I need to consider whether to apply it directly to the class I’m looking at, or to the type code itself.
* Do I make engineer a subtype of employee, or should I give the employee an employee type property which can have subtypes for engineer and manager?
  * Using direct subclassing is simpler, but I can’t use it for the job type if I need it for something else.
  * I also can’t use direct subclasses if the type is mutable.
* If I need to move the subclasses to an employee type property, I can do that by using Replace Primitive with Object (174) on the type code to create an employee type class and then using Replace Type Code with Subclasses on that new class.

```javascript
class Employee {
  constructor(name){
    this._name = name;
  }
  toString() {return `${this.name} (${this.type})`;}
}

class Engineer extends Employee {
  get type() {return "engineer";}
}

class Salesman extends Employee {
  get type() {return "salesman";}
}

class Manager extends Employee {
  get type() {return "manager";}
}

function createEmployee(name) {
  switch (type) {
    case "engineer": return new Engineer(name);
    case "salesman": return new Salesman(name);
    case "manager":  return new Manager (name);
    default: throw new Error(`Employee cannot be of type ${type}`);
  }
}
```
