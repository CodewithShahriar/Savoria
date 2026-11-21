import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Savoria | Futuristic Fine Dining & Culinary Odyssey",
  description: "Experience an avant-garde culinary destination. Indulge in wood-fired prime steaks, Atlantic seafood, Neapolitan hearth pizzas, bespoke cocktails, and decadent patisserie.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#06080d] text-gray-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
