// import Footer from "@/components/shared/Footer"
// import Header from "@/components/shared/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full max-w-[60rem] min-h-screen mx-auto flex gap-4 flex-col">
      {/* <Header /> */}
      <main className="w-full p-5 flex flex-col gap-6">{children}</main>
      {/* <Footer /> */}
    </div>
  )
}
