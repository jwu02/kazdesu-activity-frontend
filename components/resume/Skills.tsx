import { skills } from "@/lib/constants/resume"
import SectionTitle from "./SectionTitle"

const Skills = () => {
  return (
    <div>
      <SectionTitle title="Skills" />
      <ul className="flex flex-col list-disc pl-5">
        {skills.map((skill, index) => (
          <li key={index}>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Skills