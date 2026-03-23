"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, Phone, HelpCircle } from "lucide-react";
import clsx from "clsx";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string; dot?: boolean }[];
  badge?: "NEW";
  dot?: boolean;
};

const navItems: NavItem[] = [
  { label: "DASHBOARD", href: "/dashboard" },
  {
    label: "REPORTS",
    children: [
      { label: "Sales", href: "/reports/sales" },
      { label: "Transactions", href: "/reports/transactions" },
      { label: "Invoices", href: "/reports/invoices" },
      { label: "Shift", href: "/reports/shift" },
    ],
  },
  {
    label: "LIBRARY",
    children: [
      { label: "Item Library", href: "/library/items" },
      { label: "Modifiers", href: "/library/modifiers" },
      { label: "Categories", href: "/library/categories" },
      { label: "Bundle Package", href: "/library/bundles" },
      { label: "Promo", href: "/library/promo" },
      { label: "Discounts", href: "/library/discounts" },
      { label: "Taxes", href: "/library/taxes" },
      { label: "Gratuity", href: "/library/gratuity" },
      { label: "Sales Type", href: "/library/sales-type" },
      { label: "Brands", href: "/library/brands" },
    ],
  },
  { label: "INGREDIENT" },
  {
    label: "INVENTORY",
    children: [
      { label: "Summary", href: "/inventory/summary" },
      { label: "Suppliers", href: "/inventory/suppliers" },
      { label: "Purchase Order (PO)", href: "/inventory/purchase-order" },
      { label: "Transfer", href: "/inventory/transfer" },
      { label: "Adjustment", href: "/inventory/adjustment" },
    ],
  },
  {
    label: "ONLINE CHANNELS",
    children: [
      { label: "Moka Order", href: "/online-channels/moka-order" },
      { label: "GoFood", href: "/online-channels/gofood" },
    ],
  },
  {
    label: "CUSTOMERS",
    children: [
      { label: "Customers List", href: "/customers/list" },
      { label: "Feedback", href: "/customers/feedback" },
      { label: "Loyalty Program", href: "/customers/loyalty-program" },
    ],
  },
  {
    label: "EMPLOYEES",
    children: [
      { label: "Employee Slots", href: "/employees/slots" },
      { label: "Employee Access", href: "/employees/access" },
      { label: "PIN Access", href: "/employees/pin-access" },
    ],
  },
  {
    label: "CUSTOMER DISPLAY",
    children: [
      { label: "Campaign", href: "/customer-display/campaign" },
      { label: "Settings", href: "/customer-display/settings" },
    ],
  },
  {
    label: "PAYMENTS",
    children: [
      { label: "QRIS", href: "/payments/qris" },
      { label: "Payment Configuration", href: "/payments/configuration" },
    ],
  },
  {
    label: "ACCOUNT SETTINGS",
    dot: true,
    children: [
      { label: "Account", href: "/account/profile" },
      { label: "Billing", href: "/account/billing" },
      { label: "Outlets", href: "/account/outlets" },
      { label: "Bank Account", href: "/account/bank-account" },
      { label: "Public Profile", href: "/account/public-profile" },
      { label: "Receipt", href: "/account/receipt", dot: true },
      { label: "Checkout", href: "/account/checkout", dot: true },
      { label: "Inventory", href: "/account/inventory" },
      { label: "Email Notification", href: "/account/email-notification" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    REPORTS: true,
  });

  const toggleSection = (label: string, currentOpen: boolean) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !currentOpen,
    }));
  };

  const isChildActive = (item: NavItem) =>
    item.children?.some((c) => pathname.startsWith(c.href)) ?? false;

  return (
    <aside className="fixed left-0 top-0 z-[100] flex h-screen w-[240px] pointer-events-auto flex-col bg-[#1e2433] text-white shadow-[2px_0_12px_rgba(0,0,0,0.18)]">
      {/* Logo + user */}
      <div className="px-5 pt-5 pb-3">
        <div className="text-2xl font-bold tracking-widest text-white mb-4">
          moka
        </div>
        <Link href="/account/profile" className="flex items-center gap-1 text-sm text-gray-300 hover:text-white">
          Test User
          <ChevronDown size={14} />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto mt-2">
        {navItems.map((item) => {
          if (item.href) {
            // Direct link (Dashboard)
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={clsx(
                  "relative z-[101] block cursor-pointer px-5 py-3 text-xs font-semibold tracking-wider transition-colors",
                  active
                    ? "text-white bg-[#2d3447]"
                    : "text-gray-400 hover:text-white hover:bg-[#2a3040]"
                )}
              >
                {item.label}
              </Link>
            );
          }

          if (item.children) {
            const childActive = isChildActive(item);
            const open = openSections[item.label] ?? childActive;
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleSection(item.label, open)}
                  type="button"
                  className={clsx(
                    "relative z-[101] flex w-full cursor-pointer items-center justify-between px-5 py-3 text-xs font-semibold tracking-wider transition-colors",
                    childActive
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  {open ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>
                {open && (
                  <div className="pl-5 pb-1">
                    {item.children.map((child) => {
                      const active = pathname === child.href || pathname.startsWith(child.href + "/");
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={clsx(
                            "relative z-[101] block cursor-pointer rounded-sm px-4 py-2 text-sm transition-colors",
                            active
                              ? "bg-[#2a3040] text-[#4d9cf5] font-medium"
                              : "text-gray-400 hover:text-white"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {child.label}
                            {child.dot ? (
                              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#e35f53]" />
                            ) : null}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // Section with no children yet
          return (
            <button
              key={item.label}
              type="button"
              className="relative z-[101] flex w-full cursor-pointer items-center justify-between px-5 py-3 text-xs font-semibold tracking-wider text-gray-400 transition-colors hover:text-white"
            >
              <span className="flex items-center gap-2">
                {item.label}
                {item.dot && (
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                )}
              </span>
              <span className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-[10px] bg-[#4d9cf5] text-white px-1.5 py-0.5 rounded font-bold">
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={14} />
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 pb-4 pt-2 border-t border-[#2d3447]">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <Phone size={12} />
          <span>1500970</span>
        </div>
        <button
          type="button"
          className="relative z-[101] w-full cursor-pointer rounded bg-[#2563eb] px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700"
        >
          <HelpCircle size={14} />
          Tutorials &amp; Help
        </button>
      </div>
    </aside>
  );
}
