import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.scss";
import Footer from "@/components/Footer/Footer";

const inter = Inter ({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  icons: "/img/website-icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={montserrat.className}>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
