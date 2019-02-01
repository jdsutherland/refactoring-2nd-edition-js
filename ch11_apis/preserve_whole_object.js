// If I see code that derives a couple of values from a record and then passes these values into a function, I like to replace those values with the whole record itself, letting the function body derive the values it needs.
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (aPlan.withinRange(low, high))
  // PRESERVE WHOLE OBJECT =>
if (aPlan.withinRange(aRoom.daysTempRange))

// The main reason I wouldn’t do this is if I don’t want the called function to have a dependency on the whole—which typically occurs when they are in different modules.

