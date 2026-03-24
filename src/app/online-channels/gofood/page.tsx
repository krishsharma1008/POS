"use client";

import { ChevronLeft, ChevronRight, Utensils } from "lucide-react";
import Link from "next/link";

export default function GoFoodPage() {
  return (
    <div className="p-8 max-w-4xl">
      {/* Back link */}
      <Link
        href="/online-channels/buku-order"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        &larr; Back to Home
      </Link>

      {/* Header card */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex items-center gap-5">
          {/* GoFood logo */}
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Utensils size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">GoFood</h1>
            <p className="text-blue-600 text-sm font-medium flex items-center gap-1">
              <span>&#9671;</span> Online Ordering
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg text-gray-800 mb-2">Rp. 0/Outlet/Month</p>
          <button className="bg-[#082f5a] text-white px-6 py-2.5 rounded font-medium">
            Get Started
          </button>
        </div>
      </div>

      {/* Banner carousel */}
      <div className="relative my-8">
        <div className="flex gap-4 overflow-hidden">
          {/* Banner 1 */}
          <div className="flex-1 h-64 bg-gradient-to-r from-red-500 to-orange-400 rounded-xl p-8 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-3xl font-bold mb-2">LebiHepi)</p>
              <p className="text-xl">
                pesan <span className="font-bold">gofood</span>
              </p>
            </div>
          </div>
          {/* Banner 2 */}
          <div className="flex-1 h-64 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl p-8 flex flex-col justify-center">
            <p className="text-white text-sm mb-1">Welcome.</p>
            <p className="text-white text-xl font-semibold mb-2">
              Interested in growing your culinary business?
            </p>
            <p className="text-gray-300 text-sm italic">
              #ThereIsAlwaysAWay
            </p>
          </div>
        </div>
        {/* Nav arrows */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Information section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Information
        </h2>
        <div className="bg-white rounded-xl shadow p-6 min-h-[120px]">
          <p className="text-sm text-gray-400">
            No information available at this time.
          </p>
        </div>
      </div>
    </div>
  );
}
