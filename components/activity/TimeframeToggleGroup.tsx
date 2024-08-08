import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { filterWindowMapping, MS_IN_DAY } from '@/lib/constants'
import { TimeframeToggleGroupProps } from '@/lib/componentProps'

const TimeframeToggleGroup: React.FC<TimeframeToggleGroupProps> = ({ setFilterWindow }) => {
  return (
    <Tabs defaultValue="day">
      <TabsList className="rounded-full p-1">
        {Object.entries(filterWindowMapping).map(([key, { label, multiplier }]) => (
          <TabsTrigger 
            key={key}
            value={key}
            onClick={() => setFilterWindow(MS_IN_DAY * multiplier)}
            className="rounded-full w-12"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default TimeframeToggleGroup