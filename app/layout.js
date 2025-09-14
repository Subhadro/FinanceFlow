import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinanceFlow",
  description: "Smart Personal Finance Management Platform",
  icons: {
    icon: "/sm-logo.png",
    shortcut: "/sm-logo.png",
    apple: "/sm-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/sm-logo.png" type="image/png" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-gray-100 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Built with ❤️ by Subhadro - Full Stack Developer</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
