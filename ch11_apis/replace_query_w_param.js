//When looking through a function’s body, I sometimes see references to something in the function’s scope that I’m not happy with.
// This might be a reference to a global variable, or to an element in the same module that I intend to move away.
// To resolve this, I need to replace the internal reference with a parameter, shifting the responsibility of resolving the reference to the caller of the function.

// Most of these cases are due to my wish to alter the dependency relationships in the code—to make the target function no longer dependent on the element I want to parameterize.
// There’s a tension here between converting everything to parameters, which results in long repetitive parameter lists, and sharing a lot of scope which can lead to a lot of coupling between functions.
// Like most tricky decisions, it’s not something I can reliably get right, so it’s important that I can reliably change things so the program can take advantage of my increasing understanding.

// Example:
class HeatingPlan {
  get targetTemperature() {
    if      (thermostat.selectedTemperature >  this._max) return this._max;
    else if (thermostat.selectedTemperature <  this._min) return this._min;
    else return thermostat.selectedTemperature;
  }
}

// caller
if      (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
else if (thePlan.targetTemperature < thermostat.currentTemperature) setToCool();
else setOff();
