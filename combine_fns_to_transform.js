const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

// then

function enrichReading(original) {
  // lodash cloneDeep
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(0, base - taxThreshold(result.year));
  return result;
}

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);

it('check reading unchanged', function() {
  const baseReading = {
    customer : "ivan",
    quantity : 15,
    month : 5,
    year : 2011}
  const oracle = _.cloneDeep(baseReading);
  enrichReading(baseReading);
  assert.deepEqual(baseReading, oracle);
});
