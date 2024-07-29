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
    linearGradientId: 'colorUv',
    colour: '#8884d8'
  }, 
  leftClicks: {
    endPoint: 'left-clicks',
    summaryLabel: 'left clicks',
    dataKey: 'Left Clicks',
    linearGradientId: 'colorPv',
    colour: '#82ca9d'
  }, 
  rightClicks: {
    endPoint: 'right-clicks',
    summaryLabel: 'right clicks',
    dataKey: 'Right Clicks',
    linearGradientId: 'colorRc',
    colour: '#ffc658'
  }, 
  mouseMovements: {
    endPoint: 'mouse-movements',
    summaryLabel: 'walked mouse for',
    dataKey: 'Mouse Movements',
    linearGradientId: 'colorMm',
    colour: '#83a6ed'
  }
}