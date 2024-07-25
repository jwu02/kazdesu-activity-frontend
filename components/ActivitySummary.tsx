const ActivitySummary = ({ keyPresses, leftClicks, rightClicks, mouseMovements }) => {
  return (
    <div className="flex justify-around">
      <DataSummaryContainer 
        label="key presses"
        total={keyPresses.reduce((t, obj) => t = t + obj.count, 0 )}
      />

      <DataSummaryContainer 
        label="left clicks"
        total={leftClicks.reduce((t, obj) => t = t + obj.count, 0 )}
      />

      <DataSummaryContainer 
        label="right clicks"
        total={rightClicks.reduce((t, obj) => t = t + obj.count, 0 )}
      />

      <DataSummaryContainer 
        label="walked mouse for"
        total={mouseMovements.reduce((t, obj) => t = t + Math.round(obj.amount), 0 )}
      />
    </div>
  )
}

export default ActivitySummary

const formatCount = (count: number) => {
  if (count >= 10000) {
    return `${Math.floor(count/1000)}k`
  }
  return String(count)
}

const formatMeasurement = (amount: number) => {
  if (amount >= 1000) {
    amount = amount/1000
  } else {
    return amount
  }

  if (amount >= 10) {
    amount = Math.floor(amount)
  } else {
    amount = Math.floor(amount*10)/10
  }

  return String(amount)+'k'
}

const DataSummaryContainer = ({ label, total }) => {
  return (
    <div className="flex flex-col items-center py-3 px-5">
      <span className="text-nowrap text-sm">{label}</span>
      <span>
        <span className="text-2xl font-black">
          {label=="walked mouse for" ? 
            <>
              {formatMeasurement(total)}
              <span className="text-xl">m</span>
            </>
            :
            formatCount(total)
          }
        </span>
      </span>
    </div>
  )
}