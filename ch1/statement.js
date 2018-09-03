// FIXME: the book seems to treat `invoice` & `plays` as global scope
// but shows them as args of statement()
// use `require` as workaround
const invoice = require('./invoices')[0];
const plays = require('./plays');

function statement (invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  return renderPlainText (statementData, plays);

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
    return result;
  }
}

function renderPlainText (data, plays) {
  let totalAmount = 0;
  let result = `Statement for ${data.customer}\n`;
  for (const perf of data.performances) {

    //print line for this order
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    totalAmount += perf.amount;
  }

  result += `Amount owed is ${usd(totalAmount)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
                          { style: "currency", currency: "USD",
                            minimumFractionDigits: 2 }).format(aNumber/100);
  }

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (const perf of data.performances) {
      volumeCredits += perf.volumeCredits;
    }
    return volumeCredits;
  }
}

module.exports = statement;
