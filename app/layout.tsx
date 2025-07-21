import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resumind",
  description: "Smart feedback for your dream job!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-[url('/images/bg.svg')] bg-cover pt-10">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
