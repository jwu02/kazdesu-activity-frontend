import SectionTitle from './SectionTitle'
import { languages } from '@/lib/constants/resume'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const Languages = () => {
  return (
    <div>
      <SectionTitle title="Languages" />
      <div className="flex flex-col gap-2">
        {languages.map((language, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span>{language.name}</span>
              <Badge className="bg-white" variant="outline">{language.proficiency}</Badge>
            </div>
            <Progress value={language.value} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Languages