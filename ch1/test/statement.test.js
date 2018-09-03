const statement = require('../statement');
const invoice = require('../invoices');
const plays = require('../plays');
const expect = require("chai").expect;

describe('statement', () => {
  it('generates a statement', () => {
    const expected = `Statement for BigCo\n  Hamlet: $650.00 (55 seats)\n  As You Like It: $580.00 (35 seats)\n  Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits\n`;

    const result = statement(invoice[0], plays);

    expect(result).to.eql(expected);
  });
});
