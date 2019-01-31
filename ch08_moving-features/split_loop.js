function foo() {
  let totalSalary = 0;
  for (const p of people) {
    totalSalary += p.salary;
  }

  return `totalSalary: ${totalSalary}`;
}

function bar() {
  let youngest = people[0] ? people[0].age : Infinity;

  for (const p of people) {
    if (p.age < youngest) youngest = p.age;
  }

  return `youngestAge: ${youngest}`;
}
