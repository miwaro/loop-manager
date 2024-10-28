import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loop List App",
  description: "A setlist manager for loop artists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
