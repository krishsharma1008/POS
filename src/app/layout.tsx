import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "POS BukuWarung",
  description: "Point of Sale system for BukuWarung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#f9f9f9] antialiased">
        <Sidebar />
        <div className="relative z-0 ml-[240px] min-h-screen flex flex-col">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
