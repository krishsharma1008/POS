#!/usr/bin/env python3
"""Generate BukuWarung POS Feature List PDF"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import inch, mm
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable
)

# Colors
BRAND_DARK = HexColor("#1e2433")
BRAND_BLUE = HexColor("#2563eb")
BRAND_GREEN = HexColor("#6abf69")
ACCENT_LIGHT = HexColor("#f0f4ff")
GRAY_600 = HexColor("#4b5563")
GRAY_400 = HexColor("#9ca3af")
GRAY_200 = HexColor("#e5e7eb")

def build_pdf():
    output_path = "/Users/krishsharma/Desktop/POS_BUKU/BukuWarung_POS_Feature_List.pdf"
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=50,
        leftMargin=50,
        topMargin=60,
        bottomMargin=50,
    )

    styles = getSampleStyleSheet()

    # Custom styles
    styles.add(ParagraphStyle(
        name="CoverTitle",
        fontName="Helvetica-Bold",
        fontSize=36,
        leading=44,
        textColor=BRAND_DARK,
        alignment=TA_CENTER,
        spaceAfter=12,
    ))
    styles.add(ParagraphStyle(
        name="CoverSubtitle",
        fontName="Helvetica",
        fontSize=16,
        leading=22,
        textColor=GRAY_600,
        alignment=TA_CENTER,
        spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="CoverDate",
        fontName="Helvetica",
        fontSize=12,
        leading=16,
        textColor=GRAY_400,
        alignment=TA_CENTER,
        spaceAfter=30,
    ))
    styles.add(ParagraphStyle(
        name="SectionTitle",
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=26,
        textColor=BRAND_DARK,
        spaceBefore=24,
        spaceAfter=10,
    ))
    styles.add(ParagraphStyle(
        name="SubSection",
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=18,
        textColor=BRAND_BLUE,
        spaceBefore=14,
        spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="BodyText2",
        fontName="Helvetica",
        fontSize=10.5,
        leading=15,
        textColor=GRAY_600,
        alignment=TA_JUSTIFY,
        spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name="BulletItem",
        fontName="Helvetica",
        fontSize=10.5,
        leading=15,
        textColor=GRAY_600,
        leftIndent=20,
        spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="TOCItem",
        fontName="Helvetica",
        fontSize=11,
        leading=20,
        textColor=BRAND_DARK,
        leftIndent=15,
    ))
    styles.add(ParagraphStyle(
        name="TOCHeading",
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=28,
        textColor=BRAND_DARK,
        alignment=TA_CENTER,
        spaceAfter=20,
    ))
    styles.add(ParagraphStyle(
        name="FooterNote",
        fontName="Helvetica-Oblique",
        fontSize=9,
        leading=12,
        textColor=GRAY_400,
        alignment=TA_CENTER,
    ))

    story = []

    # ── COVER PAGE ──
    story.append(Spacer(1, 120))

    # Logo-style header
    cover_table = Table(
        [[Paragraph("BUKU<font color='#2563eb'>WARUNG</font>", ParagraphStyle(
            name="LogoText", fontName="Helvetica-Bold", fontSize=42,
            leading=50, textColor=BRAND_DARK, alignment=TA_CENTER
        ))]],
        colWidths=[doc.width]
    )
    cover_table.setStyle(TableStyle([
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    story.append(cover_table)

    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="40%", thickness=3, color=BRAND_BLUE, spaceAfter=20, spaceBefore=0, hAlign="CENTER"))

    story.append(Paragraph("Point of Sale Platform", styles["CoverTitle"]))
    story.append(Paragraph("Complete Feature List &amp; Product Overview", styles["CoverSubtitle"]))
    story.append(Spacer(1, 16))
    story.append(Paragraph("Empowering Indonesian SMBs with modern,<br/>all-in-one restaurant and retail management", styles["CoverSubtitle"]))
    story.append(Spacer(1, 40))
    story.append(Paragraph("Version 1.0  |  March 2026", styles["CoverDate"]))
    story.append(Paragraph("Confidential  &mdash;  For Internal &amp; Stakeholder Review", styles["CoverDate"]))

    story.append(PageBreak())

    # ── TABLE OF CONTENTS ──
    story.append(Spacer(1, 30))
    story.append(Paragraph("Table of Contents", styles["TOCHeading"]))
    story.append(HRFlowable(width="100%", thickness=1, color=GRAY_200, spaceAfter=16))

    toc_items = [
        ("1.", "Executive Summary"),
        ("2.", "Dashboard &amp; Analytics"),
        ("3.", "Reports"),
        ("4.", "Library Management"),
        ("5.", "Ingredient Management"),
        ("6.", "Inventory Management"),
        ("7.", "Online Channels"),
        ("8.", "Customer Management"),
        ("9.", "Employee Management"),
        ("10.", "Customer Display"),
        ("11.", "Table Management"),
        ("12.", "Partner Solutions"),
        ("13.", "Payments"),
        ("14.", "Account Settings"),
        ("15.", "Platform Highlights"),
    ]
    for num, title in toc_items:
        story.append(Paragraph(
            f"<b>{num}</b>&nbsp;&nbsp;&nbsp;{title}",
            styles["TOCItem"]
        ))
    story.append(PageBreak())

    # ── HELPER FUNCTIONS ──
    def section(title):
        story.append(Paragraph(title, styles["SectionTitle"]))
        story.append(HRFlowable(width="100%", thickness=1.5, color=BRAND_BLUE, spaceAfter=10))

    def subsection(title):
        story.append(Paragraph(title, styles["SubSection"]))

    def body(text):
        story.append(Paragraph(text, styles["BodyText2"]))

    def bullet(text):
        story.append(Paragraph(f"\u2022&nbsp;&nbsp;{text}", styles["BulletItem"]))

    def feature_box(features):
        """Create a highlighted feature box"""
        data = []
        for f in features:
            data.append([Paragraph(f"\u2713&nbsp;&nbsp;{f}", ParagraphStyle(
                name="FeatBox", fontName="Helvetica", fontSize=10,
                leading=14, textColor=BRAND_DARK
            ))])
        t = Table(data, colWidths=[doc.width - 30])
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), ACCENT_LIGHT),
            ("BOX", (0, 0), (-1, -1), 0.5, BRAND_BLUE),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("LEFTPADDING", (0, 0), (-1, -1), 15),
            ("RIGHTPADDING", (0, 0), (-1, -1), 15),
        ]))
        story.append(t)
        story.append(Spacer(1, 10))

    # ── 1. EXECUTIVE SUMMARY ──
    section("1. Executive Summary")
    body(
        "BukuWarung POS is a comprehensive, cloud-ready Point of Sale platform purpose-built for "
        "the Indonesian market. Designed for restaurants, cafes, retail shops, and food &amp; beverage "
        "businesses of all sizes, it provides a complete suite of tools to manage sales, inventory, "
        "employees, customers, and online ordering channels &mdash; all from a single, intuitive interface."
    )
    body(
        "With deep integration into Indonesia's leading food delivery platforms (GoFood, Moka Order), "
        "support for Indonesian Rupiah (Rp.) currency formatting, and compliance with local tax regulations "
        "including PPN, BukuWarung POS enables business owners to streamline operations, reduce costs, "
        "and accelerate growth."
    )
    feature_box([
        "All-in-one POS for restaurants, cafes, and retail",
        "Indonesian Rupiah (Rp.) native currency support",
        "Real-time dashboard with sales analytics and trend charts",
        "13 detailed report types covering every aspect of the business",
        "Full item library with CSV bulk import/export",
        "Multi-outlet inventory management with transfers and adjustments",
        "GoFood and Moka Order online channel integrations",
        "Employee management with role-based access and shift tracking",
        "Table management for dine-in restaurants",
        "Flexible payment processing with multiple payment methods",
    ])

    story.append(PageBreak())

    # ── 2. DASHBOARD ──
    section("2. Dashboard &amp; Analytics")
    body(
        "The Dashboard provides a real-time, at-a-glance overview of business performance. "
        "Owners and managers can monitor key metrics, spot trends, and make data-driven decisions "
        "without leaving the home screen."
    )

    subsection("Summary View")
    bullet("Gross Sales &mdash; Total revenue before deductions, displayed with daily trend comparison")
    bullet("Net Sales &mdash; Revenue after discounts, promos, and refunds")
    bullet("Number of Transactions &mdash; Total completed orders for the period")
    bullet("Average Transaction Value &mdash; Mean spend per customer visit")
    bullet("Discounts Given &mdash; Total value of applied discounts")
    bullet("Items Sold &mdash; Aggregate quantity across all product categories")

    subsection("Visual Analytics")
    bullet("Gross Sales Line Chart &mdash; Hourly or daily revenue trend with smooth curves")
    bullet("Transactions Line Chart &mdash; Order volume patterns to identify peak hours")
    bullet("Top Selling Items &mdash; Ranked product performance cards")
    bullet("Sales by Category &mdash; Category-level revenue breakdown")
    bullet("Sales by Payment Type &mdash; Cash vs digital payment mix analysis")
    bullet("Sales by Outlet &mdash; Multi-location performance comparison")

    subsection("Outlet Comparison")
    body(
        "The Outlet Comparison tab enables multi-location businesses to benchmark performance "
        "across branches, identifying top-performing outlets and those requiring attention."
    )

    # ── 3. REPORTS ──
    section("3. Reports")
    body(
        "BukuWarung POS provides 13 specialized report types organized into four main categories, "
        "offering granular visibility into every aspect of your business operations. All reports "
        "support export to CSV, XLSX, and PDF formats."
    )

    subsection("3.1 Sales Reports")
    body("The Sales module contains 13 detailed report views:")
    bullet("<b>Sales Summary</b> &mdash; High-level revenue, tax, and discount totals by period")
    bullet("<b>Sales by Item</b> &mdash; Per-product revenue, quantity sold, and margin analysis")
    bullet("<b>Sales by Category</b> &mdash; Category-level aggregation with percentage breakdown")
    bullet("<b>Sales by Payment Method</b> &mdash; Cash, QRIS, debit, credit card split")
    bullet("<b>Sales by Outlet</b> &mdash; Cross-location revenue comparison")
    bullet("<b>Sales by Employee (Server)</b> &mdash; Individual staff sales performance")
    bullet("<b>Sales by Dining Option</b> &mdash; Dine-in vs takeaway vs delivery breakdown")
    bullet("<b>Discount Report</b> &mdash; Applied discounts by type, frequency, and total value")
    bullet("<b>Tax Report</b> &mdash; PPN and custom tax collection summary for compliance")
    bullet("<b>Modifier/Add-On Sales</b> &mdash; Revenue from item modifiers and add-ons")
    bullet("<b>Promo Performance</b> &mdash; Active promotions effectiveness and redemption rates")
    bullet("<b>Gratuity Report</b> &mdash; Service charge collection summary")
    bullet("<b>Gross Profit</b> &mdash; Revenue minus COGS with margin percentages")

    subsection("3.2 Transaction Reports")
    bullet("<b>Successful Transactions</b> &mdash; Completed orders with receipt details and amounts")
    bullet("<b>Cancelled Transactions</b> &mdash; Cancelled orders with reasons and timestamps")
    bullet("<b>Void Transactions</b> &mdash; Voided receipts with employee attribution")
    body("Each transaction tab includes receipt-level search, summary statistics, and date filtering.")

    subsection("3.3 Invoice Reports")
    bullet("Status-based filtering: All, Paid, Unpaid, Overdue, Partially Paid")
    bullet("Invoice search by number or customer name")
    bullet("Quick link to create new invoices from the report view")
    bullet("Export invoices for accounting integration")

    subsection("3.4 Shift Reports")
    bullet("Outlet and date-based shift history")
    bullet("Cash-in/cash-out tracking per shift")
    bullet("Employee shift assignment and duration")
    bullet("Quick link to start a new shift directly from the report")

    story.append(PageBreak())

    # ── 4. LIBRARY ──
    section("4. Library Management")
    body(
        "The Library is the central product catalog for your business. It manages everything from "
        "individual items to pricing rules, with full CRUD operations and bulk CSV import/export "
        "capabilities across all sub-modules."
    )

    subsection("4.1 Item Library")
    body(
        "The core product catalog supporting unlimited items with detailed attributes."
    )
    bullet("Item name, SKU, category, price, cost (COGS), and stock quantity")
    bullet("Multi-outlet assignment for location-specific availability")
    bullet("Description field for internal notes and POS display")
    bullet("Advanced filtering: search, category filter, inventory status (In Stock / Out of Stock)")
    bullet("<b>CSV Bulk Import</b> &mdash; Upload items via CSV with intelligent column auto-mapping, "
           "preview table, and one-click import")
    bullet("<b>CSV Export</b> &mdash; Download full catalog for backup or external analysis")

    subsection("4.2 Modifiers")
    bullet("Create modifier groups (e.g., 'Size', 'Extra Toppings', 'Spice Level')")
    bullet("Multiple options per group, each with its own additional price")
    bullet("Attach modifiers to items for customizable ordering")
    bullet("CSV import/export for bulk modifier management")

    subsection("4.3 Categories")
    bullet("Organize items into logical categories (Food, Beverages, Desserts, etc.)")
    bullet("Track item count per category automatically")
    bullet("Full CRUD with search and CSV import/export")

    subsection("4.4 Bundle Packages")
    bullet("Create combo/bundle deals with multiple items at a set price")
    bullet("Define bundle contents as comma-separated item lists")
    bullet("Set bundle pricing independent of individual item prices")
    bullet("Ideal for meal deals, party packages, and promotional combos")

    subsection("4.5 Promos")
    bullet("Create time-bound promotional campaigns with start and end dates")
    bullet("Support for percentage and fixed-value promo types")
    bullet("Active/inactive toggle for quick promo management")
    bullet("Track promo performance through the Sales Reports module")

    subsection("4.6 Discounts")
    bullet("<b>Percentage discounts</b> &mdash; e.g., 10% off, 25% off")
    bullet("<b>Fixed amount discounts</b> &mdash; e.g., Rp. 5,000 off, Rp. 10,000 off")
    bullet("Active/inactive status toggle for each discount rule")
    bullet("CSV import for bulk discount setup")

    subsection("4.7 Taxes")
    bullet("Configure tax rules with custom names and rates (e.g., PPN 11%)")
    bullet("Active/inactive toggle per tax rule")
    bullet("Multiple tax rules can be applied simultaneously")
    bullet("Tax collection tracked and reported in the Tax Report")

    subsection("4.8 Gratuity")
    bullet("Define service charge rates (e.g., 5%, 10%)")
    bullet("Active/inactive toggle for flexible application")
    bullet("Gratuity collection tracked in the Gratuity Report")

    subsection("4.9 Sales Types")
    bullet("Define custom sales channels: Dine-In, Takeaway, Delivery, Drive-Through")
    bullet("Active/inactive toggle per sales type")
    bullet("Sales type data feeds into the Sales by Dining Option report")

    subsection("4.10 Brands")
    bullet("Manage product brands for multi-brand businesses")
    bullet("Track item count per brand")
    bullet("CSV import/export for bulk brand management")

    story.append(PageBreak())

    # ── 5. INGREDIENT ──
    section("5. Ingredient Management")
    body(
        "The Ingredient module enables recipe-level inventory tracking for food and beverage businesses. "
        "By linking raw ingredients to finished menu items, businesses can automatically track ingredient "
        "consumption, calculate food costs, and receive low-stock alerts before running out of key supplies."
    )
    bullet("Create and manage raw ingredient inventory (e.g., rice, chicken, cooking oil)")
    bullet("Define recipes linking ingredients to menu items with precise quantities")
    bullet("Automatic ingredient deduction when items are sold")
    bullet("Low-stock threshold alerts to prevent stockouts")
    bullet("Ingredient cost tracking for accurate food cost analysis")
    bullet("Supplier linkage for streamlined reordering")

    # ── 6. INVENTORY ──
    section("6. Inventory Management")
    body(
        "A complete inventory management system for tracking stock levels, managing suppliers, "
        "processing purchase orders, and handling inter-outlet transfers and adjustments."
    )

    subsection("6.1 Inventory Summary")
    bullet("Real-time stock level overview across all outlets")
    bullet("Date-range filtering for historical inventory snapshots")
    bullet("Outlet-specific inventory views")
    bullet("Item Library and search filters for quick lookups")
    bullet("Bulk import support for beginning inventory setup")
    bullet("Export to CSV/XLSX/PDF for reporting")

    subsection("6.2 Suppliers")
    bullet("Maintain a comprehensive supplier directory")
    bullet("Store contact name, email, phone, and address per supplier")
    bullet("Search and filter suppliers for quick access")
    bullet("Link suppliers to purchase orders for streamlined procurement")

    subsection("6.3 Purchase Orders (PO)")
    bullet("Create and track purchase orders with auto-generated PO numbers")
    bullet("Status workflow: Pending &rarr; Approved &rarr; Received")
    bullet("Outlet-specific PO management")
    bullet("Total cost tracking with Rupiah formatting")
    bullet("Filter by status for efficient PO pipeline management")

    subsection("6.4 Transfers")
    bullet("Transfer stock between outlets with auto-generated transfer numbers")
    bullet("Status tracking: Pending &rarr; Completed")
    bullet("From/To outlet specification with item count")
    bullet("Full audit trail for inter-location stock movement")

    subsection("6.5 Adjustments")
    bullet("Record inventory adjustments with categorized reasons")
    bullet("Reason codes: Damaged, Lost, Stocktake, Other")
    bullet("Auto-generated adjustment numbers for audit compliance")
    bullet("Outlet-specific adjustments with date tracking")

    story.append(PageBreak())

    # ── 7. ONLINE CHANNELS ──
    section("7. Online Channels")
    body(
        "Seamlessly connect your physical POS to Indonesia's leading online ordering platforms. "
        "All online orders flow directly into your POS, eliminating double-entry and ensuring "
        "accurate inventory tracking across channels."
    )

    subsection("7.1 Moka Order")
    body(
        "Moka Order is the built-in online ordering solution that turns any business into an "
        "offline-to-online operation. Customers can browse your menu, place orders, and pay "
        "directly through a branded storefront &mdash; all managed from your Moka POS dashboard."
    )
    bullet("<b>Dine-In Feature</b> &mdash; QR code-based contactless ordering for in-restaurant customers")
    bullet("Branded online storefront setup in minutes")
    bullet("Real-time order sync with POS")
    bullet("Manage menus, pricing, and availability from one dashboard")
    bullet("Subscription-based unlock for premium features")

    subsection("7.2 GoFood Integration")
    body(
        "Direct integration with GoFood, Indonesia's largest food delivery platform powered by Gojek. "
        "Receive GoFood orders directly in your POS without switching between apps."
    )
    bullet("Rp. 0/Outlet/Month &mdash; Free integration with no monthly fees")
    bullet("Automatic menu sync between POS and GoFood")
    bullet("Order notifications and real-time status updates")
    bullet("Consolidated reporting across dine-in and delivery channels")
    bullet("Easy one-click setup with guided onboarding")

    # ── 8. CUSTOMERS ──
    section("8. Customer Management")
    body(
        "Build lasting customer relationships with a comprehensive CRM integrated directly into "
        "your POS. Track purchase history, manage loyalty programs, and create targeted promotions."
    )
    bullet("Customer database with name, phone, email, and address")
    bullet("Purchase history tracking linked to transaction records")
    bullet("Customer grouping and segmentation for targeted marketing")
    bullet("Loyalty points system with configurable earning and redemption rules")
    bullet("Customer-specific discounts and special pricing")
    bullet("Birthday and anniversary tracking for personalized promotions")
    bullet("Export customer data for external CRM or email marketing tools")

    # ── 9. EMPLOYEES ──
    section("9. Employee Management")
    body(
        "Manage your workforce with role-based access control, shift scheduling, and performance tracking."
    )
    bullet("<b>Role-Based Access</b> &mdash; Admin, Manager, Cashier, Server, Kitchen roles with granular permissions")
    bullet("<b>Shift Management</b> &mdash; Clock in/out tracking, shift scheduling, and overtime monitoring")
    bullet("<b>Performance Tracking</b> &mdash; Sales per employee, transactions handled, and average ticket size")
    bullet("Employee directory with contact details and employment dates")
    bullet("PIN-based login for fast cashier switching")
    bullet("Commission tracking and tip distribution management")

    story.append(PageBreak())

    # ── 10. CUSTOMER DISPLAY ──
    section("10. Customer Display")
    body(
        "Transform a secondary screen into a customer-facing display that shows order details, "
        "totals, and promotional content in real-time."
    )
    bullet("Real-time order itemization as items are added to the cart")
    bullet("Running total with tax and discount breakdown")
    bullet("Promotional banners and brand messaging between transactions")
    bullet("Customizable display themes matching your brand")
    bullet("Support for tablets and secondary monitors")

    # ── 11. TABLE MANAGEMENT ──
    section("11. Table Management")
    body(
        "Purpose-built for dine-in restaurants, the Table Management module provides a visual "
        "floor plan with real-time table status tracking."
    )
    bullet("Visual floor plan editor with drag-and-drop table placement")
    bullet("Real-time table status: Available, Occupied, Reserved, Needs Cleaning")
    bullet("Table assignment to servers for split-section management")
    bullet("Merge and split tables for flexible group dining")
    bullet("Reservation management with time-slot booking")
    bullet("Average table turn time analytics for capacity optimization")

    # ── 12. PARTNER SOLUTIONS ──
    section("12. Partner Solutions")
    body(
        "Extend BukuWarung POS capabilities through a curated marketplace of partner integrations "
        "designed specifically for the Indonesian market."
    )
    bullet("<b>Accounting Integration</b> &mdash; Sync sales data to popular accounting software")
    bullet("<b>E-wallet Partners</b> &mdash; GoPay, OVO, DANA, ShopeePay payment acceptance")
    bullet("<b>Delivery Partners</b> &mdash; GoFood, GrabFood, ShopeeFood order aggregation")
    bullet("<b>Marketing Tools</b> &mdash; WhatsApp Business and SMS campaign integrations")
    bullet("<b>Analytics Partners</b> &mdash; Advanced BI tools for deeper data analysis")
    bullet("One-click partner activation from the Partner Solutions hub")

    # ── 13. PAYMENTS ──
    section("13. Payments")
    body(
        "Flexible payment processing supporting Indonesia's diverse payment landscape, from cash "
        "to the latest digital wallets."
    )
    bullet("<b>Cash</b> &mdash; Cash drawer management with change calculation")
    bullet("<b>Debit/Credit Cards</b> &mdash; Visa, Mastercard, BCA, Mandiri, BNI, BRI")
    bullet("<b>QRIS</b> &mdash; Universal QR code payment supporting all Indonesian e-wallets")
    bullet("<b>E-Wallets</b> &mdash; GoPay, OVO, DANA, ShopeePay, LinkAja")
    bullet("<b>Bank Transfer</b> &mdash; Direct bank transfer with auto-reconciliation")
    bullet("<b>Split Payments</b> &mdash; Combine multiple payment methods in a single transaction")
    bullet("<b>Partial Payments</b> &mdash; Accept deposits and track outstanding balances")
    bullet("End-of-day payment reconciliation report")

    # ── 14. ACCOUNT SETTINGS ──
    section("14. Account Settings")
    body(
        "Configure your business profile, outlet details, and platform preferences."
    )
    bullet("<b>Business Profile</b> &mdash; Business name, description, and logo upload")
    bullet("<b>Address</b> &mdash; Full address with city, province, and postal code")
    bullet("<b>Contact</b> &mdash; Phone (+62 format), email, website")
    bullet("<b>Social Media</b> &mdash; Twitter, Facebook, Instagram links for receipt branding")
    bullet("Multi-outlet configuration with individual outlet settings")
    bullet("Receipt customization with logo, footer message, and social handles")
    bullet("Notification preferences for low stock, daily summaries, and order alerts")

    story.append(PageBreak())

    # ── 15. PLATFORM HIGHLIGHTS ──
    section("15. Platform Highlights")

    highlights_data = [
        ["Feature", "Details"],
        ["Currency", "Indonesian Rupiah (Rp.) with proper thousand-separator formatting"],
        ["Language", "Bahasa Indonesia and English support"],
        ["Data Import", "CSV bulk import with intelligent column auto-mapping and preview"],
        ["Data Export", "CSV, XLSX, and PDF export across all modules"],
        ["Multi-Outlet", "Manage multiple locations from a single dashboard"],
        ["Responsive UI", "Optimized for desktop, tablet, and POS terminal displays"],
        ["Real-Time Sync", "Instant data synchronization across devices and outlets"],
        ["Tax Compliance", "PPN (11%) and custom tax rule support for Indonesian regulations"],
        ["Offline Mode", "Continue operations during internet outages with auto-sync on reconnect"],
        ["Security", "Role-based access control, PIN login, and encrypted data storage"],
    ]

    t = Table(highlights_data, colWidths=[130, doc.width - 150])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BRAND_DARK),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 11),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 10),
        ("TEXTCOLOR", (0, 1), (-1, -1), GRAY_600),
        ("ALIGN", (0, 0), (-1, 0), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BACKGROUND", (0, 1), (-1, -1), white),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, ACCENT_LIGHT]),
        ("BOX", (0, 0), (-1, -1), 1, GRAY_200),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, GRAY_200),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
    ]))
    story.append(t)
    story.append(Spacer(1, 30))

    # Footer
    story.append(HRFlowable(width="100%", thickness=1, color=GRAY_200, spaceAfter=15))
    story.append(Paragraph(
        "BukuWarung POS  &mdash;  Empowering Indonesian Businesses",
        styles["FooterNote"]
    ))
    story.append(Paragraph(
        "&copy; 2026 BukuWarung. All rights reserved. This document is confidential.",
        styles["FooterNote"]
    ))

    # Build
    doc.build(story)
    print(f"PDF generated successfully: {output_path}")

if __name__ == "__main__":
    build_pdf()
