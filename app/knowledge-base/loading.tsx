export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="text-gray-500 dark:text-gray-400">
          Loading knowledge graph...
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          If accessing from China, please use a VPN, as data is fetched from GitHub.
        </div>
      </div>
    </div>
  )
} 