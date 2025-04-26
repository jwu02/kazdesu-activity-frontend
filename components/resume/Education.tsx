import { education } from "@/lib/constants/resume"
import SectionTitle from "./SectionTitle"

const Education = () => {
  return (
    <div>
      <SectionTitle title="Education" />
      <div className="flex flex-col gap-2">
        {education.map((item, index) => (
          <div key={index}>
            <div className="font-bold">{item.school}</div>
            <div className="text-muted-foreground">{item.place}, {item.date}</div>
            <div>{item.qualification}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Education