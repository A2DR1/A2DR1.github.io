import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Austin Shen — Math & Data Science @ UMich",
  description:
    "Personal portfolio of Austin (Zi Jun) Shen — researcher, engineer, and student at the University of Michigan.",
  keywords: [
    "Austin Shen",
    "University of Michigan",
    "Math",
    "Data Science",
    "Machine Learning",
    "Research",
    "Portfolio",
  ],
  authors: [{ name: "Austin Shen", url: "https://github.com/A2DR1" }],
  openGraph: {
    title: "Austin Shen — Portfolio",
    description:
      "Researcher & Engineer at the University of Michigan studying Math & Data Science.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050508] text-slate-200 antialiased">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
