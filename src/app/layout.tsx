import type { Metadata } from "next";
import { poppins } from "@/app/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taxonomy Explorer",
  description: "Inspect the tags and categories of any WordPress site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}
