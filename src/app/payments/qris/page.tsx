import Link from "next/link";
import { AlertCircle, Shield, Smartphone, QrCode } from "lucide-react";
import { qrisRegistration } from "@/lib/mock-data/payments";

export default function QrisPage() {
  return (
    <div className="px-6 py-4">
      <h1 className="mb-7 text-[2.6rem] font-bold leading-none text-[#0d2a42]">
        QRIS
      </h1>

      <section className="relative mb-10 overflow-hidden rounded-2xl bg-[linear-gradient(115deg,#3b71b5_0%,#3a76b9_36%,#1fb6d7_100%)] px-10 py-12 text-white shadow-sm">
        <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.08)_18%,transparent_18%,transparent_42%,rgba(255,255,255,0.06)_42%,rgba(255,255,255,0.06)_58%,transparent_58%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-[620px] pl-8">
            <h2 className="text-[3.4rem] font-semibold leading-[1.25] text-white">
              Terima pembayaran apa aja
              <br />
              Lebih Mudah
              <br />
              Pakai QRIS
            </h2>
          </div>

          <div className="relative h-[290px]">
            <div className="absolute right-10 top-0 flex h-24 w-24 items-center justify-center rounded-full bg-white text-[#111] shadow-lg">
              <span className="text-[2rem] font-black tracking-tight">QRIS</span>
            </div>

            <div className="absolute right-0 top-12 h-[190px] w-[170px] rounded-[34px] bg-[#18b7d7]" />
            <div className="absolute right-[58px] top-[112px] h-[96px] w-[86px] rounded-t-2xl rounded-b-md bg-[#11a3d1]" />
            <div className="absolute right-[30px] top-[82px] flex h-[190px] w-[145px] flex-col items-center">
              <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-[#233ca8] text-[#ffd33d]">
                <div className="h-12 w-12 rounded-full border-4 border-current border-t-transparent" />
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#ffe43f]">
                <Smartphone size={36} className="text-[#0e3878]" />
              </div>
            </div>

            <div className="absolute left-5 top-32 flex h-[210px] w-[130px] flex-col items-center justify-end rounded-t-[70px] rounded-b-[28px] bg-[#e31d16] pb-4">
              <div className="absolute -top-22 left-9 h-24 w-24 rounded-full bg-[#2730ae]" />
              <div className="absolute -top-5 left-5 h-16 w-16 rounded-full bg-[#ff9b61]" />
              <div className="absolute left-0 top-[72px] h-20 w-20 rounded-full bg-[#2730ae]" />
              <div className="h-14 w-20 rounded-t-[34px] rounded-b-[14px] bg-[#0ab66d]" />
            </div>

            <div className="absolute left-[138px] top-[132px] flex h-[112px] w-[76px] items-center justify-center rounded-xl bg-white shadow-md">
              <div className="text-center text-[#0e3878]">
                <QrCode size={46} className="mx-auto" />
                <div className="mt-1 text-xs font-semibold">PAY</div>
              </div>
            </div>

            <div className="absolute bottom-0 left-[140px] h-12 w-[350px] rounded-l-md bg-[#ff8b00]" />
            <div className="absolute bottom-0 left-[420px] h-12 w-[90px] rounded-r-md bg-[#ffb042]" />
            <div className="absolute right-[180px] top-16 text-[#14a652]">
              <Shield size={32} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-10 pl-2 text-[#39556a]">
          <div>
            <h2 className="mb-10 text-[1.2rem] font-semibold text-[#0d2a42]">
              Accepting QRIS Payment with Ease
            </h2>

            <div className="space-y-10 text-[1.02rem] leading-[2.1]">
              <p>
                Start accepting payments with QRIS Payment at your outlets, allow
                your customers to make cashless payments from any digital payment
                providers.
              </p>

              <p>
                By using the QRIS service, you declare that you know and agree to
                the latest QRIS{" "}
                <Link href="/payments/qris" className="font-semibold text-[#0d58b6] hover:underline">
                  Payment Terms and Conditions
                </Link>
                .
              </p>

              <p>
                If you need assistance, please call us on{" "}
                <span className="font-semibold text-[#0d58b6]">1500970</span> or
                visit the{" "}
                <Link href="/payments/qris" className="font-semibold text-[#0d58b6] hover:underline">
                  Helpdesk
                </Link>{" "}
                for further information.
              </p>

              <p>----------</p>

              <p className="italic">
                Mulai terima pembayaran dengan QRIS di outlet Anda agar pelanggan
                dapat membayar non-tunai dari berbagai aplikasi dompet digital.
              </p>
            </div>
          </div>
        </section>

        <aside className="rounded-[22px] bg-[#f8f8f9] px-8 py-10 shadow-sm">
          <h2 className="mb-6 text-[1.25rem] font-semibold text-[#0d2a42]">
            QRIS Registration
          </h2>

          <div className="space-y-4 text-[1.02rem] leading-[1.75] text-[#4b6478]">
            <p>
              Accept cashless transactions from various digital payment providers
              with just one QRIS code.
            </p>
            <p>----------</p>
            <p className="italic">
              Terima transaksi non-tunai dari berbagai layanan pembayaran digital
              dengan satu kode QRIS saja.
            </p>
          </div>

          <div className="mt-6 rounded-[20px] bg-white px-8 py-7 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="text-[#33a9db]">
                <div className="text-3xl font-bold lowercase">gopay</div>
                <div className="text-[0.72rem] text-[#97a7b7]">
                  powered by gojek
                </div>
              </div>
              <div className="text-[1.02rem] leading-[1.6] text-[#4b6478]">
                <p>
                  MDR: <span className="font-semibold">{qrisRegistration.mdr}</span>
                </p>
                <p>
                  Settlement cycle: {qrisRegistration.settlementCycle}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4 rounded-[14px] border border-[#f4dfa9] bg-[#fff5dc] px-6 py-5 text-[#546779]">
            <AlertCircle className="shrink-0 text-[#f6ae1e]" size={30} />
            <p className="text-[1.02rem]">Your business is still in trial mode</p>
          </div>

          <button
            disabled
            className="mt-5 w-full rounded-xl bg-[#c8d0d6] px-6 py-4 text-[1.1rem] font-semibold text-[#607789]"
          >
            Start Registration
          </button>
        </aside>
      </div>

      <p className="mt-10 text-right text-sm text-[#c1c7cf]">v2026.02.24-1</p>
    </div>
  );
}
