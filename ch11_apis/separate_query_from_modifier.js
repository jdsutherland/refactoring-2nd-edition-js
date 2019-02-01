function alertForMiscreant (people) {
  if (findMiscreant(people) !== "") setOffAlarms();
}

function findMiscreant (people) {
  for (const p of people) {
    if (p === "Don") {
      return "Don";
    }
    if (p === "John") {
      return "John";
    }
  }
  return "";
}

// 1. copy the function, name after query aspect
// 2. remove side effects

// clients
const found = findMiscreant(people);
alertForMiscreant(people);
