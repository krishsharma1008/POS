"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import SettingToggle from "@/components/account/SettingToggle";
import { emailRecipients } from "@/lib/mock-data/account";

export default function EmailNotificationPage() {
  const [dailySales, setDailySales] = useState(true);
  const [inventoryAlerts, setInventoryAlerts] = useState(true);
  const [promoUpdates, setPromoUpdates] = useState(true);

  return (
    <div className="max-w-[980px] px-6 py-4">
      <h1 className="mb-14 text-[2.6rem] font-bold leading-none text-[#2d3f54]">
        Email Notifications
      </h1>

      <section className="mb-16">
        <h2 className="mb-6 border-b border-[#D1D5DB] pb-3 text-[1rem] font-medium uppercase tracking-wide text-[#6a6a6a]">
          Manage Email Notification
        </h2>
        <p className="mb-10 max-w-[860px] text-[1rem] leading-9 text-[#9a9a9a]">
          Receive emails on new products or how your business is performing.
          Emails are automatically sent to your account email.
        </p>
        <div className="space-y-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[1rem] text-[#666]">Daily Sales Summary</div>
              <div className="mt-1 text-[0.98rem] text-[#9a9a9a]">
                Receive emails about your sales
              </div>
            </div>
            <SettingToggle checked={dailySales} onChange={setDailySales} />
          </div>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[1rem] text-[#666]">Inventory Alerts</div>
              <div className="mt-1 text-[0.98rem] text-[#9a9a9a]">
                Receive daily email of items that are low or out of stock
              </div>
            </div>
            <SettingToggle checked={inventoryAlerts} onChange={setInventoryAlerts} />
          </div>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[1rem] text-[#666]">Promo Update Notification</div>
              <div className="mt-1 text-[0.98rem] text-[#9a9a9a]">
                Receive emails at the beginning of next day when a promo is updated
              </div>
              <div className="mt-1 text-[0.92rem] italic text-[#9a9a9a]">
                * Email Notification will be sent to Business Owner and
                Administrator email
              </div>
            </div>
            <SettingToggle checked={promoUpdates} onChange={setPromoUpdates} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 border-b border-[#D1D5DB] pb-3 text-[1rem] font-medium uppercase tracking-wide text-[#6a6a6a]">
          Manage Recipient Alert Email
        </h2>
        <p className="mb-8 max-w-[860px] text-[1rem] leading-9 text-[#9a9a9a]">
          Email notification will only be sent to recipient that already{" "}
          <b>verified</b> their email. Please check your email inbox or SPAM
          folder and make sure to mark us as not spam sender to receive our email
          notifications.
        </p>
        <button className="mb-8 w-full rounded-md bg-[#3a7db9] px-6 py-4 text-[1.1rem] font-medium text-white">
          Add Email Recipient
        </button>
        <div className="mb-8 rounded-sm bg-[#efefef] px-6 py-5">
          {emailRecipients.map((recipient) => (
            <div
              key={recipient.id}
              className="flex items-center justify-between text-[1.05rem] text-[#555]"
            >
              <span>{recipient.email}</span>
              {recipient.verified ? (
                <span className="inline-flex items-center gap-2 text-[#4c8f3a]">
                  <CheckCircle2 size={18} />
                  Verified
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button className="rounded-md bg-[#337ab7] px-7 py-3 text-lg font-medium text-white">
            Save
          </button>
        </div>
      </section>
    </div>
  );
}
