// import { Inter } from "next/font/google";
import { Open_Sans } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

import { cn } from "@/lib/utils"

const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          open_sans.variable)}>
            {children}
      </body>
    </html>
  );
}
