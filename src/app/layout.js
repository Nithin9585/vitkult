import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VITKULT - VIT Karunadu Unnati for Language and Technology",
  description: "kannada club of vitbhopal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem>
          <Navbar/>
        <Toaster/>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
