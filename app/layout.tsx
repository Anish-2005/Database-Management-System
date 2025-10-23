import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorAnimation from "@/components/CursorAnimation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuantumDB - Next-Gen Database Management System",
  description: "Experience unprecedented performance with our AI-powered distributed database system. Built for the most demanding applications with real-time analytics and infinite scalability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-none`}
      >
        {/* Cursor Animation Component */}
        <CursorAnimation 
          color="#8b5cf6"
          size={24}
          blendMode="screen"
        />
        
        {children}
      </body>
    </html>
  );
}