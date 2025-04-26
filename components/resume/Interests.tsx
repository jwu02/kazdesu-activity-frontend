import { interests } from "@/lib/constants/resume"
import SectionTitle from "./SectionTitle"
import { Badge } from "@/components/ui/badge"

const Interests = () => {
  return (
    <div>
      <SectionTitle title="Other Interests" />
      <div className="flex flex-wrap gap-1">
        {
          interests.map((interest, index) => (
            <Badge key={index} variant="outline" className="text-base bg-white">{interest}</Badge>
          ))
        }
      </div>
    </div>
  )
}

export default Interests