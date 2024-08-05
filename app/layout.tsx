import type { Metadata } from "next"
import "./globals.css"
import { Roboto_Mono } from "next/font/google"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const robotoMono = Roboto_Mono({ 
  subsets: ["latin"], 
  variable: "--roboto-mono" 
})

export const metadata: Metadata = {
  title: "kazdesu",
  description: "Solo Leveling Inspired.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
