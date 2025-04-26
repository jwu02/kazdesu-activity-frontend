import { ThemeProvider } from "@/components/theme-provider";

export default function KnowledgeBaseLayout({
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
      <div className="w-screen h-screen">
        {children}
      </div>
    </ThemeProvider>
  );
} 