import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: '/logoimg.png', // Path relative to the public directory or app directory
    // You can also specify multiple icons for different media queries:
    // icon: [
    //   { url: '/light-icon.png', media: '(prefers-color-scheme: light)' },
    //   { url: '/dark-icon.png', media: '(prefers-color-scheme: dark)' },
    // ],
  },
  title: "NURSYNC",
  description: "Application for nursing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
