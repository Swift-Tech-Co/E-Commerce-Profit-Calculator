/**
 * E-Commerce Profit Calculator
 * Swift Tech Co. — https://swifttechco.com
 */

const PLATFORMS = [
  "Shopify",
  "WooCommerce",
  "Custom Build",
  "Amazon FBA",
  "Multi-channel (Shopify + Amazon + eBay)",
  "Subscription Box Platform",
];

const PLATFORM_FEES = {
  "Shopify":                                 0.029,
  "WooCommerce":                             0.015,
  "Custom Build":                            0.010,
  "Amazon FBA":                              0.150,
  "Multi-channel (Shopify + Amazon + eBay)": 0.120,
  "Subscription Box Platform":               0.040,
};

const CATEGORIES = [
  "Fashion & Apparel",
  "Electronics",
  "Health & Beauty",
  "Home & Garden",
  "Food & Beverage",
  "Sports & Outdoors",
  "Books & Media",
  "B2B / Wholesale",
];

const GROSS_MARGINS = {
  "Fashion & Apparel":  0.55,
  "Electronics":        0.25,
  "Health & Beauty":    0.65,
  "Home & Garden":      0.45,
  "Food & Beverage":    0.38,
  "Sports & Outdoors":  0.48,
  "Books & Media":      0.40,
  "B2B / Wholesale":    0.35,
};

/**
 * @param {string} platform
 * @param {string} category
 * @param {number} monthlyOrders
 * @param {number} averageOrderValue
 * @returns {{ monthlyRevenue, monthlyFee, monthlyNet, annualRevenue, annualNet, netMarginPct }}
 */
function calculate(platform, category, monthlyOrders, averageOrderValue) {
  if (PLATFORM_FEES[platform] === undefined) throw new Error(`Unknown platform: ${platform}`);
  if (GROSS_MARGINS[category] === undefined) throw new Error(`Unknown category: ${category}`);
  if (monthlyOrders <= 0)       throw new Error("monthlyOrders must be > 0");
  if (averageOrderValue <= 0)   throw new Error("averageOrderValue must be > 0");

  const rev  = monthlyOrders * averageOrderValue;
  const fee  = rev * PLATFORM_FEES[platform];
  const cogs = rev * (1 - GROSS_MARGINS[category]);
  const net  = rev - fee - cogs;

  return {
    monthlyRevenue: Math.round(rev),
    monthlyFee:     Math.round(fee),
    monthlyNet:     Math.round(net),
    annualRevenue:  Math.round(rev * 12),
    annualNet:      Math.round(net * 12),
    netMarginPct:   Math.round((net / rev) * 100),
  };
}

module.exports = { PLATFORMS, CATEGORIES, PLATFORM_FEES, GROSS_MARGINS, calculate };
