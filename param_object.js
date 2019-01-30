const station = {
  name : "ZB1",
  readings : [
    {temp : 47, time : "2016­11­10 09:10"},
    {temp : 48, time : "2016­11­10 09:11"},
    {temp : 49, time : "2016­11­10 09:12"},
    {temp : 50, time : "2016­11­10 09:13"},
    {temp : 51, time : "2016­11­10 09:14"},
    {temp : 52, time : "2016­11­10 09:15"},
    {temp : 53, time : "2016­11­10 09:16"},
  ]
};

function readingsOutsideRange(station, min, max) {
  return station.readings.filter(r = > r.temp < min || r.temp > max);
}

alerts = readingsOutsideRange(
  station,
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
)

// after:
// NumberRange is the param object
class NumberRange {
  constructor(min, max) {
    this._data = {min : min, max : max};
  }


  get min() { return this._data.min; }
  get max() { return this._data.max; }
}

function readingsOutsideRange(station, range) {
  return station.readings
    .filter(r => r.temp < range.min || r.temp > range.max);
}

const range = new NumberRange(
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
)

alerts = readingsOutsideRange(station, range)

// bonus

// add to NumberRange
contains(arg) { return (arg >= this.min && arg <= this.max); }

function readingsOutsideRange(station, range) {
  return station.readings
    .filter(r => !range.contains(r.temp));
}
