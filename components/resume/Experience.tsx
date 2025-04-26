import { projects } from "@/lib/constants/resume"
import SectionTitle from "./SectionTitle"

const Experience = () => {
  return (
    <div>
      <SectionTitle title="Experience" />
      <div className="flex flex-col gap-2">
        {projects.map((project, index) => (
          <div key={index}>
            <h3 className="font-semibold">{project.title}</h3>
            <ul className="list-disc pl-5">
              {project.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience