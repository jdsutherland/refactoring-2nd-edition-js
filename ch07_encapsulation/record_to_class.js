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
    this._name = data.name;
    this._country = data.country;
  }

  get name() { return this.name }
  set name(aString) { this._name = aString }

  get country() { return this.country }
  set country(aCountryCode) { this._country = aCountryCode }
}

const organization = new Organization({name: "Acme Gooseberries", country: "GB"})
function getOrganization() { return organization; }

getOrganization().name = newName;
result += `<h1>${getOrganization().name}</h1>`;
