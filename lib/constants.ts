export const MS_IN_SECOND = 1000
export const MS_IN_MINUTE = 60*MS_IN_SECOND
export const MS_IN_HOUR = 60*MS_IN_MINUTE
export const MS_IN_DAY = 24*MS_IN_HOUR
export const MS_IN_WEEK = 7*MS_IN_DAY
export const MS_IN_MONTH = 30*MS_IN_DAY

export const activityTypeMapping = {
  keyPresses: {
    endPoint: 'key-presses',
    summaryLabel: 'key presses',
    dataKey: 'Key Presses',
    linearGradientId: 'colorKp',
    colour: '#4477aa'
  }, 
  leftClicks: {
    endPoint: 'left-clicks',
    summaryLabel: 'left clicks',
    dataKey: 'Left Clicks',
    linearGradientId: 'colorLc',
    colour: '#228833'
  }, 
  rightClicks: {
    endPoint: 'right-clicks',
    summaryLabel: 'right clicks',
    dataKey: 'Right Clicks',
    linearGradientId: 'colorRc',
    colour: '#ccbb44'
  }, 
  mouseMovements: {
    endPoint: 'mouse-movements',
    summaryLabel: 'walked mouse for',
    dataKey: 'Mouse Movements',
    linearGradientId: 'colorMm',
    colour: '#aa3377'
  }
}

export const filterWindowMapping = {
  day: {
    label: '24h',
    multiplier: 1
  },
  week: {
    label: '7d',
    multiplier: 7
  },
  month: {
    label: '30d',
    multiplier: 30
  }
}