"use client";

import { useState } from "react";
import { Upload, Globe, Twitter, Facebook, Instagram } from "lucide-react";

export default function PublicProfilePage() {
  const [form, setForm] = useState({
    businessName: "Buku Bakery",
    description: "",
    address: "",
    city: "Kota Jakarta Barat",
    province: "DKI Jakarta",
    zip: "",
    phoneCode: "+62",
    phone: "87778232299",
    email: "",
    website: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-[920px] px-6 py-4">
      <h2 className="mb-6 border-b border-[#D1D5DB] pb-3 text-[1rem] font-medium uppercase tracking-wide text-[#6a6a6a]">
        Account Profile
      </h2>

      <div className="mb-6 flex gap-6">
        <div className="flex h-[170px] w-[170px] shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded border-2 border-dashed border-[#bfc7cf] text-[#555] transition-colors hover:border-[#9aa9b9]">
          <Upload size={34} />
          <span className="text-center text-[0.98rem] leading-tight">
            Upload
            <br />
            business logo
          </span>
        </div>

        <div className="flex-1 space-y-6">
          <input
            type="text"
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            placeholder="Business Name"
            className="w-full rounded border border-[#cfd6dd] bg-[#f5f5f5] px-4 py-3 text-[1rem] text-[#666] outline-none"
          />
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Description"
            rows={4}
            className="w-full resize-none rounded border border-[#cfd6dd] bg-[#f5f5f5] px-4 py-3 text-[1rem] text-[#666] outline-none"
          />
        </div>
      </div>

      <p className="mb-10 max-w-[760px] text-[1rem] leading-9 text-[#a0a0a0]">
        Uploading image here will affect all outlet. If you want to set some
        outlet differently, you can do it in{" "}
        <button className="text-[#2d7fd2] hover:underline">receipt page</button>.
      </p>

      <div className="space-y-8">
        <input
          type="text"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="Address"
          className="w-full rounded border border-[#cfd6dd] bg-[#f5f5f5] px-4 py-3 text-[1rem] text-[#666] outline-none"
        />

        <div className="grid grid-cols-3 gap-10">
          <input
            type="text"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className="rounded border border-[#cfd6dd] bg-[#f5f5f5] px-4 py-3 text-[1rem] text-[#666] outline-none"
          />
          <input
            type="text"
            value={form.province}
            onChange={(e) => update("province", e.target.value)}
            className="rounded border border-[#cfd6dd] bg-[#f5f5f5] px-4 py-3 text-[1rem] text-[#666] outline-none"
          />
          <input
            type="text"
            value={form.zip}
            onChange={(e) => update("zip", e.target.value)}
            placeholder="Zip"
            className="rounded border border-[#cfd6dd] bg-[#f5f5f5] px-4 py-3 text-[1rem] text-[#666] outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="flex overflow-hidden rounded border border-[#cfd6dd] bg-white">
            <div className="flex items-center gap-2 border-r border-[#cfd6dd] px-4 text-[1rem] text-[#666]">
              <span className="inline-block h-6 w-8 rounded-sm bg-[linear-gradient(180deg,#d82433_0%,#d82433_50%,#ffffff_50%,#ffffff_100%)]" />
              <span>{form.phoneCode}</span>
            </div>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="flex-1 bg-white px-4 py-3 text-[1rem] text-[#666] outline-none"
            />
          </div>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="Email"
            className="rounded border border-[#cfd6dd] bg-white px-4 py-3 text-[1rem] text-[#666] outline-none"
          />
        </div>
      </div>

      <h3 className="mb-6 mt-16 text-[1rem] font-medium uppercase tracking-wide text-[#6a6a6a]">
        Links
      </h3>

      <div className="space-y-7">
        <div className="flex items-center gap-4 border-b border-[#edf1f5] pb-4">
          <Globe size={20} className="text-[#9d9d9d]" />
          <input
            type="text"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="Website"
            className="flex-1 text-[1rem] text-[#777] outline-none placeholder:text-[#9d9d9d]"
          />
        </div>
        <div className="flex items-center gap-4 border-b border-[#edf1f5] pb-4">
          <Twitter size={20} className="text-[#69c8ef]" />
          <input
            type="text"
            value={form.twitter}
            onChange={(e) => update("twitter", e.target.value)}
            placeholder="Twitter Username"
            className="flex-1 text-[1rem] text-[#777] outline-none placeholder:text-[#9d9d9d]"
          />
        </div>
        <div className="flex items-center gap-4 border-b border-[#edf1f5] pb-4">
          <Facebook size={20} className="text-[#4f7cc4]" />
          <input
            type="text"
            value={form.facebook}
            onChange={(e) => update("facebook", e.target.value)}
            placeholder="Facebook Username"
            className="flex-1 text-[1rem] text-[#777] outline-none placeholder:text-[#9d9d9d]"
          />
        </div>
        <div className="flex items-center gap-4 border-b border-[#edf1f5] pb-4">
          <Instagram size={20} className="text-[#d24c7f]" />
          <input
            type="text"
            value={form.instagram}
            onChange={(e) => update("instagram", e.target.value)}
            placeholder="Instagram Username"
            className="flex-1 text-[1rem] text-[#777] outline-none placeholder:text-[#9d9d9d]"
          />
        </div>
      </div>
    </div>
  );
}
