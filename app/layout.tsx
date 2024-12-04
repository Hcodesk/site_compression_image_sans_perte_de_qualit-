import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "compresseur_image",
  description: "cette application permet de compresser les images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
