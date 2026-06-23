import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LIVENTRA MEDIA",
  description: "Live streaming website for LIVENTRA MEDIA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
