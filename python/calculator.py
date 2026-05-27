"""
E-Commerce Profit Calculator
Swift Tech Co. — https://swifttechco.com

Estimates monthly revenue, platform fees, COGS, net profit, and annual projections
for e-commerce businesses based on platform, product category, order volume, and AOV.
"""

PLATFORMS = [
    "Shopify",
    "WooCommerce",
    "Custom Build",
    "Amazon FBA",
    "Multi-channel (Shopify + Amazon + eBay)",
    "Subscription Box Platform",
]

PLATFORM_FEES = {
    "Shopify":                                  0.029,
    "WooCommerce":                              0.015,
    "Custom Build":                             0.010,
    "Amazon FBA":                               0.150,
    "Multi-channel (Shopify + Amazon + eBay)":  0.120,
    "Subscription Box Platform":                0.040,
}

CATEGORIES = [
    "Fashion & Apparel",
    "Electronics",
    "Health & Beauty",
    "Home & Garden",
    "Food & Beverage",
    "Sports & Outdoors",
    "Books & Media",
    "B2B / Wholesale",
]

GROSS_MARGINS = {
    "Fashion & Apparel":  0.55,
    "Electronics":        0.25,
    "Health & Beauty":    0.65,
    "Home & Garden":      0.45,
    "Food & Beverage":    0.38,
    "Sports & Outdoors":  0.48,
    "Books & Media":      0.40,
    "B2B / Wholesale":    0.35,
}


def calculate(
    platform: str,
    category: str,
    monthly_orders: int,
    average_order_value: float,
) -> dict:
    """
    Returns monthly and annual revenue, fees, net profit, and margin.

    Args:
        platform: One of PLATFORMS.
        category: One of CATEGORIES.
        monthly_orders: Number of orders per month (must be > 0).
        average_order_value: Average order value in USD (must be > 0).

    Returns:
        dict with keys: monthly_revenue, monthly_fee, monthly_net, annual_revenue,
                        annual_net, net_margin_pct
    """
    if platform not in PLATFORM_FEES:
        raise ValueError(f"Unknown platform: {platform}")
    if category not in GROSS_MARGINS:
        raise ValueError(f"Unknown category: {category}")
    if monthly_orders <= 0:
        raise ValueError("monthly_orders must be greater than 0")
    if average_order_value <= 0:
        raise ValueError("average_order_value must be greater than 0")

    rev  = monthly_orders * average_order_value
    fee  = rev * PLATFORM_FEES[platform]
    cogs = rev * (1 - GROSS_MARGINS[category])
    net  = rev - fee - cogs

    return {
        "monthly_revenue": round(rev),
        "monthly_fee":     round(fee),
        "monthly_net":     round(net),
        "annual_revenue":  round(rev * 12),
        "annual_net":      round(net * 12),
        "net_margin_pct":  round((net / rev) * 100),
    }
