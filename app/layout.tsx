import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import { Inter } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning className={inter.className}>
          <QueryProvider>
            <NuqsAdapter>
              {children}
              <Toaster />
            </NuqsAdapter>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
