const organization = {name: "Acme Gooseberries", country: "GB"};

// usage ex throughout program...
result += `<h1>${organization.name}</h1>`;
organization.name = newName;

// 1. encap. var
function getRawOrganization() { return organization; }

result += `<h1>${getRawOrganization().name}</h1>`;
getRawOrganization().name = newName;

// 2. create class

class Organization {
  constructor(data) {
    this._data = data;
  }
}

const organization = new Organization({name: "Acme Gooseberries", country: "GB"})
function getRawOrganization() { return organization._data; }
function getOrganization() { return organization; }
