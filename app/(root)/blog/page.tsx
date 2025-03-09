import { Suspense } from "react"
import Blogs from "@/components/blog/Blogs"
import Loading from "./loading"

export const revalidate = 3600 // ISR: Revalidate every hour

export default async function BlogPage() {

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Blogs />
      </Suspense>
    </div>
  );
}