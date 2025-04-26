import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

// Load Urbanist font
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

// Metadata with favicon set
export const metadata: Metadata = {
  title: "Deepsri - IT Solutions & Digital Transformation",
  description:
    "Efficient and cost-effective Product Development and IT services for businesses of all sizes. Transform your digital operations with Deepsri.",
  keywords:
    "IT Solutions, Digital Transformation, Product Development, Business Solutions, Technology Services",
  authors: [{ name: "Deepsri" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1a1a2e",
  icons: {
    icon: "/favicon.ico", // 👈 Loads from public/favicon.ico
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} scroll-smooth`}>
      <body className="font-urbanist antialiased">
        {children}
      </body>
    </html>
  );
}
