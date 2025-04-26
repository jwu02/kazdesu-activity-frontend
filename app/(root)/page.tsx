import Link from "next/link"

const links = [
    {
      href: "/resume",
      text: "Resume",
      description: "Indulge in self-doxxing",
    },
    {
      href: "/knowledge-base",
      text: "Knowledge Base",
      description: "Peer into my brain",
    },
    {
      href: "/activity",
      text: "PC Activity",
      description: "View my computer activity and usage patterns",
    }
  ]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>

      <div className="flex flex-col gap-4 w-fit">
        {
          links.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="p-6 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-2xl font-semibold mb-2"
              target={link.text !== "PC Activity" ? "_blank" : undefined}
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold mb-2">{link.text}</h2>
                <p className="text-sm text-gray-500">{link.description}</p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
