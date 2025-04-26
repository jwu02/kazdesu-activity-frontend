import { Roboto_Mono } from "next/font/google";
import Header from "@/components/header/Header";
import { ThemeProvider } from "@/components/theme-provider";

const robotoMono = Roboto_Mono({
  variable: "--roboto-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`w-full max-w-[60rem] min-h-screen mx-auto flex gap-4 flex-col ${robotoMono.className}`}>
        <main className="w-full p-5 flex flex-col gap-6">
          <Header />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
