import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Dominique Nieves",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="flex min-h-svh flex-col">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
