const organization = {name: "Acme Gooseberries", country: "GB"};

// usage ex throughout program...
result += `<h1>${organization.name}</h1>`;
organization.name = newName;

// 1st step: encap. var
function getRawOrganization() { return organization; }

result += `<h1>${getRawOrganization().name}</h1>`;
getRawOrganization().name = newName;
