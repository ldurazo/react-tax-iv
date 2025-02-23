import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tax Bracket Calculator",
  description: "Created by Luis",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <Providers>
          <body className={inter.className}>{children}</body>
        </Providers>
      </NextIntlClientProvider>
    </html>
  );
}
