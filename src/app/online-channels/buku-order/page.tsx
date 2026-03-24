"use client";

import { Check, Lock, Info } from "lucide-react";
import Link from "next/link";

export default function BukuOrderPage() {
  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-1">
        <span className="tracking-wider">BUKU</span>{" "}
        <span className="italic font-normal text-gray-600">Order</span>
      </h1>
      <hr className="border-gray-300 mb-4" />
      <p className="text-lg font-semibold text-gray-800 mb-1">
        Run an effortless offline-to-online Business with BUKU Order!
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Manage orders easier &amp; faster with contactless processes through one
        single platform.
      </p>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#1a365d] to-[#2d5a9e] rounded-xl p-8 mb-6">
        <div className="mb-4">
          <h2 className="text-white text-2xl font-bold mb-3">
            <span className="tracking-wider">BUKU</span> Order
          </h2>
          <span className="bg-[#F5A623] text-white px-3 py-1 rounded text-sm font-bold">
            Dine-In Feature
          </span>
        </div>
        <p className="text-white text-sm mt-4 mb-2 max-w-lg">
          Manage food orders faster &amp; better with contactless order. Let
          customers who come to the restaurant to order &amp; pay directly
          through a single QR code.
        </p>
        <p className="text-blue-200 text-xs mb-6">
          All your orders will automatically integrated to your BUKU-POS.
        </p>
        <button className="bg-[#F5A623] text-white rounded px-4 py-2 flex items-center gap-2 font-medium">
          <Lock size={16} />
          Subscribe to unlock
        </button>
      </div>

      {/* Thumbnail placeholders */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 h-32 bg-gray-200 rounded-lg" />
        <div className="flex-1 h-32 bg-gray-200 rounded-lg" />
      </div>

      {/* Manage button */}
      <button className="w-full bg-[#082f5a] text-white text-center py-3 rounded-lg text-lg font-medium mb-2">
        Manage
      </button>
      <p className="text-xs text-gray-500 text-center mb-8">
        By clicking Manage, you agree to BUKU Order&apos;s{" "}
        <Link href="#" className="text-blue-600 hover:underline">
          Terms and Conditions
        </Link>
        .
      </p>

      {/* Feature list */}
      <div className="mb-2 flex items-center gap-2">
        <p className="font-semibold text-gray-800">
          Build your online storefront with BUKU Order in minutes!
        </p>
        <Info size={16} className="text-gray-400" />
        <Link href="#" className="text-blue-600 text-sm hover:underline">
          Learn how this works
        </Link>
      </div>
      <ul className="space-y-3 mt-4">
        {[
          "Create a digital menu/online catalog for your business",
          "Share your online catalog/storefront link",
          "Receive orders directly on BUKU-POS",
          "Track and manage orders from one dashboard",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
