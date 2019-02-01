# Replace Superclass With Delegate

### One of the classic examples of mis-inheritance from the early days of objects was making a stack be a subclass of list.
The idea that led to this was reusing of list’s data storage and operations to manipulate it. While it’s good to reuse, this inheritance had a problem:
* All the operations of the list were present on the interface of the stack, although most of them were not applicable to a stack.
**A better approach is to make the list into a field of the stack and delegate the necessary operations to it.**

### This is an example of one reason to use Replace Superclass with Delegate—if functions of the superclass don’t make sense on the subclass, that’s a sign that I shouldn’t be using inheritance to use the superclass’s functionality.

### As well as using all the functions of the superclass, it should also be true that every instance of the subclass is an instance of the superclass and a valid object in all cases where we’re using the superclass.
* If I have a car model class, with things like name and engine size, I might think I could reuse these features to represent a physical car, adding functions for VIN number and manufacturing date.
  * This is a common, and often subtle, modeling mistake which I’ve called the _type-instance homonym_.

As a consequence of all this, some people advise avoiding inheritance entirely—but I don’t agree with that. Provided the appropriate semantic conditions apply (every method on the supertype applies to the subtype, every instance of the subtype is an instance of the supertype), inheritance is a simple and effective mechanism. I can easily apply Replace Superclass with Delegate should the situation change and inheritance is no longer the best option.
**So my advice is to (mostly) use inheritance first, and apply Replace Superclass with Delegate when (and if) it becomes a problem.**

>> I recently was consulting for an old town’s library of ancient scrolls. They keep details of their scrolls in a catalog. Each scroll has an ID number and records its title and list of tags.
```javascript
class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }
  get id() {return this._id;}
  get title() {return this._title;}
  hasTag(arg) {return this._tags.includes(arg);}
}

// One of the things that scrolls need is regular cleaning. The code for that uses the catalog item and extends it with the data it needs for cleaning.
class Scroll {
  constructor(id, dateLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = catalog.get(catalogID);
    this._lastCleaned = dateLastCleaned;
  }
  get id() {return this._id;}
  get title() {return this._catalogItem.title;}
  hasTag(aString) {return this._catalogItem.hasTag(aString);}

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold ;
  }
  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}
// Currently the scrolls are loaded as part of a load routine.
const scrolls = aDocument
      .map(record => new Scroll(record.id,
                                LocalDate.parse(record.lastCleaned),
                                record.catalogData.id,
                                catalog));
```

This is an example of a common modeling error. There is a difference between the physical scroll and the catalog item. The scroll describing the treatment for the greyscale disease may have several copies, but be just one item in the catalog.

The refactoring shifts the role of the catalog item to that of a component of scroll; each scroll contains a unique instance of a catalog item. In many cases where I do this refactoring, this is enough. However, in this situation a better model is to link the greyscale catalog item to the six scrolls in the library that are copies of that writing. Doing this is, essentially, Change Value to Reference (256).

There’s a problem that I have to fix, however, before I use Change Value to Reference (256). In the original inheritance structure, the scroll used the catalog item’s ID field to store its ID. But if I treat the catalog item as a reference, it needs to use that ID for the catalog item ID rather than the scroll ID. This means I need to create an ID field on scroll and use that instead of one in catalog item. It’s a sort-of move, sort-of split.

