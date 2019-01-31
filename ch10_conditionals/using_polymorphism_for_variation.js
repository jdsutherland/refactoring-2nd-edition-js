// With the birds example, I’m using a clear generalization hierarchy. That’s how subclassing and polymorphism is often discussed in textbooks (including mine)—but it’s not the only way inheritance is used in practice; indeed, it probably isn’t the most common or best way. Another case for inheritance is when I wish to indicate that one object is mostly similar to another, but with some variations.

// As an example of this case, consider some code used by a rating agency to compute an investment rating for the voyages of sailing ships.
// The rating agency gives out either an “A” or “B” rating, depending of various factors due to risk and profit potential. The risk comes from assessing the nature of the voyage as well as the history of the captain’s prior voyages.

function rating(voyage, history) {
  const vpf = voyageProfitFactor(voyage, history);
  const vr = voyageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);
  if (vpf * 3 > (vr + chr * 2)) return "A";
  else return "B";
}
function voyageRisk(voyage) {
  let result = 1;
  if (voyage.length > 4) result += 2;
  if (voyage.length > 8) result += voyage.length - 8;
  if (["china", "east-indies"].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}
function captainHistoryRisk(voyage, history) {
  let result = 1;
  if (history.length < 5) result += 4;
  result += history.filter(v => v.profit < 0).length;
  if (voyage.zone === "china" && hasChina(history)) result -= 2;
  return Math.max(result, 0);
}
function hasChina(history) {
  return history.some(v => "china" === v.zone);
}
function voyageProfitFactor(voyage, history) {
  let result = 2;
  if (voyage.zone === "china") result += 1;
  if (voyage.zone === "east-indies") result += 1;
  if (voyage.zone === "china" && hasChina(history)) {
    result += 3;
    if (history.length > 10) result += 1;
    if (voyage.length > 12) result += 1;
    if (voyage.length > 18) result -= 1;
  }
  else {
    if (history.length > 8) result += 1;
    if (voyage.length > 14) result -= 1;
  }
  return result;
}

// ex caller
const voyage = {zone: "west-indies", length: 10};
const history = [
  {zone: "east-indies", profit:  5},
  {zone: "west-indies", profit: 15},
  {zone: "china",       profit: -2},
  {zone: "west-africa", profit:  7},
];

const myRating = rating(voyage, history);
