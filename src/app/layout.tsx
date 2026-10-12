import type { Metadata } from "next";
import { Jost } from "next/font/google";

import { Header } from "@/components/header";
import { SocialIcons } from "@/components/social-icons";

import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Dominique Nieves",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-black px-5 py-9 sm:py-4.5">
          <SocialIcons className="justify-center" />
        </footer>
      </body>
    </html>
  );
}
