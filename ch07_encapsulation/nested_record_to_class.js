"1920" : {
  name: "martin",
  id: "1920",
  usages: {
    "2016" : {
      "1" : 50,
      "2" : 55,
      // remaining months of the year
      },
    "2015" : {
      "1" : 70,
      "2" : 63,
      // remaining months of the year
    }
  }
},
"38673": {
  name: "neal",
  id : "38673",
  // ...
}

customerData[customerID].usages[year][month] = amount

function compareUsage (customerID, laterYear, month) {
  const later = customerData[customerID].usages[laterYear][month];
  const earlier = customerData[customerID].usages[laterYear - 1][month];
  return {laterAmount: later, change: later - earlier};
}

// 1. encapsulate var

function getRawDataOfCustomers() { return customerData; }
function setRawDataOfCustomers(arg) { return customerData = arg; }

getRawDataOfCustomers()[customerID].usages[year][month] = amount

function compareUsage (customerID, laterYear, month) {
  const later = getRawDataOfCustomers()[customerID].usages[laterYear][month];
  const earlier = getRawDataOfCustomers()[customerID].usages[laterYear - 1][month];
  return {laterAmount: later, change: later - earlier};
}

class CustomerData {
  constructor(data) {
    this._data = data
  }

  getRawData() {
    return _.cloneDeep(this._data)
  }

  setUsage(id, year, month, amount) {
    this._data[customerID].usages[year][month] = amount
  }
}

function getCustomerData() { return customerData; }
function getRawDataOfCustomers() { return customerData._data; }
function setRawDataOfCustomers(arg) { return customerData = new CustomerData(arg); }

getRawDataOfCustomers()[customerID].usages[year][month] = amount

getCustomerData().setUsage(customerID, year, month, amount)
