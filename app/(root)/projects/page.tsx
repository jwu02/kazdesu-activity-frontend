import Projects from "@/components/projects/Projects"
import { Suspense } from "react"
import Loading from "./loading"

export default function ProjectsPage() {

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Projects />
      </Suspense>
    </div>
  )
}
