import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

// Define fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO and meta tags
export const metadata = {
  title: "VITKULT - VIT Karunadu Unnati for Language and Technology",
  description: "Kannada club of VIT Bhopal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider
          frontendApi="your-clerk-frontend-api" // replace with your Clerk frontend API
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <Toaster />
           
            {children}
          </ThemeProvider>
          </ClerkProvider>
      </body>
    </html>
  );
}
