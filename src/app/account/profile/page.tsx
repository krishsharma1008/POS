import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  accountBusinessInfo,
  accountPersonalDetails,
} from "@/lib/mock-data/account";

function InfoRow({
  label,
  value,
  extra,
}: {
  label: string;
  value: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[220px_minmax(0,1fr)] border-b border-[#ebeff3] py-4 text-[1rem]">
      <span className="text-[#a0a0a0]">{label}</span>
      <div className="justify-self-end text-right text-[#555]">
        <div>{value}</div>
        {extra ? <div className="mt-2">{extra}</div> : null}
      </div>
    </div>
  );
}

function AccountBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16 max-w-[760px]">
      <div className="mb-2 flex items-center justify-between border-b border-[#D1D5DB] pb-3">
        <h2 className="text-[1rem] font-medium uppercase tracking-wide text-[#6a6a6a]">
          {title}
        </h2>
        <button className="text-[1rem] text-[#2d7fd2] hover:underline">Edit</button>
      </div>
      <div>{children}</div>
    </section>
  );
}

export default function AccountProfilePage() {
  return (
    <div className="px-6 py-4">
      <h1 className="mb-20 text-[2.6rem] font-bold leading-none text-[#2d3f54]">
        Account
      </h1>

      <AccountBlock title="Personal Details">
        <InfoRow label="Name" value={accountPersonalDetails.name} />
        <InfoRow
          label="Phone"
          value={accountPersonalDetails.phone}
          extra={
            <div className="flex items-center justify-end gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f6e8b7] px-3 py-1 text-[0.95rem] text-[#9b6b17]">
                <AlertCircle size={16} />
                WhatsApp unverified
              </span>
              <button className="text-[#2d7fd2] hover:underline">Verify now</button>
            </div>
          }
        />
        <InfoRow
          label="Email"
          value={accountPersonalDetails.email}
          extra={
            <span className="inline-flex items-center gap-2 rounded-full bg-[#dff5b5] px-3 py-1 text-[0.95rem] text-[#4aa600]">
              <CheckCircle2 size={16} />
              Verified
            </span>
          }
        />
      </AccountBlock>

      <AccountBlock title="Business Info">
        <InfoRow label="Business Name" value={accountBusinessInfo.businessName} />
        <InfoRow label="Business Address" value={accountBusinessInfo.businessAddress} />
        <InfoRow label="Province" value={accountBusinessInfo.province} />
        <InfoRow label="City / Kabupaten" value={accountBusinessInfo.city} />
        <InfoRow label="Kecamatan" value={accountBusinessInfo.district} />
        <InfoRow label="Postal Code" value={accountBusinessInfo.postalCode} />
      </AccountBlock>

      <AccountBlock title="ID">
        <InfoRow label="Business ID" value="BW-2026-001" />
        <InfoRow label="NPWP" value="-" />
      </AccountBlock>
    </div>
  );
}
