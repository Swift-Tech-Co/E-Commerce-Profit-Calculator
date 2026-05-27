#!/usr/bin/env node
/**
 * E-Commerce Profit Calculator — CLI
 * Swift Tech Co. — https://swifttechco.com
 */

const { PLATFORMS, CATEGORIES, calculate } = require("./calculator");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(r => rl.question(q, r));

async function interactive() {
  console.log("\nE-Commerce Profit Calculator");
  console.log("Swift Tech Co. — https://swifttechco.com");
  console.log("=".repeat(48));

  console.log("\nPlatform:");
  PLATFORMS.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
  const pIdx = parseInt(await ask(`Select (1-${PLATFORMS.length}): `), 10) - 1;

  console.log("\nProduct category:");
  CATEGORIES.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));
  const cIdx = parseInt(await ask(`Select (1-${CATEGORIES.length}): `), 10) - 1;

  const orders = parseInt(await ask("\nMonthly orders: "), 10);
  const aov    = parseFloat(await ask("Average order value (USD): "));

  rl.close();

  const result = calculate(PLATFORMS[pIdx], CATEGORIES[cIdx], orders, aov);
  console.log("\n" + "=".repeat(48));
  console.log("Monthly Projection");
  console.log(`  Monthly revenue:   $${result.monthlyRevenue.toLocaleString()}`);
  console.log(`  Platform fees:     $${result.monthlyFee.toLocaleString()}`);
  console.log(`  Monthly net:       $${result.monthlyNet.toLocaleString()}`);
  console.log(`  Net margin:        ${result.netMarginPct}%`);
  console.log(`\n  Annual revenue:    $${result.annualRevenue.toLocaleString()}`);
  console.log(`  Annual net profit: $${result.annualNet.toLocaleString()}`);
  console.log("\nAd spend not included. Build a better store: https://swifttechco.com/contact");
}

interactive().catch(e => { console.error(e.message); process.exit(1); });
