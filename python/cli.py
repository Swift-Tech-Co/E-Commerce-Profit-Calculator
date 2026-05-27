#!/usr/bin/env python3
"""
E-Commerce Profit Calculator — CLI
Swift Tech Co. — https://swifttechco.com
"""

from calculator import PLATFORMS, CATEGORIES, calculate


def interactive():
    print("\nE-Commerce Profit Calculator")
    print("Swift Tech Co. — https://swifttechco.com")
    print("=" * 48)

    print("\nPlatform:")
    for i, p in enumerate(PLATFORMS, 1):
        print(f"  {i}. {p}")
    idx = int(input(f"Select (1-{len(PLATFORMS)}): ")) - 1
    platform = PLATFORMS[idx]

    print("\nProduct category:")
    for i, c in enumerate(CATEGORIES, 1):
        print(f"  {i}. {c}")
    idx = int(input(f"Select (1-{len(CATEGORIES)}): ")) - 1
    category = CATEGORIES[idx]

    orders = int(input("\nMonthly orders: "))
    aov    = float(input("Average order value (USD): "))

    result = calculate(platform, category, orders, aov)
    print("\n" + "=" * 48)
    print("Monthly Projection")
    print(f"  Monthly revenue:   ${result['monthly_revenue']:,}")
    print(f"  Platform fees:     ${result['monthly_fee']:,}")
    print(f"  Monthly net:       ${result['monthly_net']:,}")
    print(f"  Net margin:        {result['net_margin_pct']}%")
    print(f"\n  Annual revenue:    ${result['annual_revenue']:,}")
    print(f"  Annual net profit: ${result['annual_net']:,}")
    print("\nAd spend not included. Build a better store: https://swifttechco.com/contact")


if __name__ == "__main__":
    interactive()
