// import Footer from "@/components/shared/Footer"
// import Header from "@/components/shared/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full max-w-[60rem] min-h-screen mx-auto border-x border-dashed border-[#ffffff]/30 flex gap-4 flex-col text-[#ffffff]">
      {/* <Header /> */}
      <main className="w-full p-5">{children}</main>
      {/* <Footer /> */}
    </div>
  )
}
