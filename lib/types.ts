import { SimulationNodeDatum } from 'd3'

export interface Node extends SimulationNodeDatum {
  id: string
  group: string
  radius: number
  isLeaf: boolean
  connectedNodes: string[]
  // Required for D3 force simulation
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

export interface Link {
  source: Node | string
  target: Node | string
  value: number
}


export interface KeyPress {
  id: number;
  count: number;
  createdAt: Date;
}

export interface LeftClick {
  id: number;
  count: number;
  createdAt: Date;
}

export interface RightClick {
  id: number;
  count: number;
  createdAt: Date;
}

export interface MouseMovement {
  id: number;
  count: number;
  createdAt: Date;
}

export type PcActivity = KeyPress | LeftClick | RightClick | MouseMovement

export type ActivityDataKey = 'Key Presses' | 'Left Clicks' | 'Right Clicks' | 'Mouse Movements'

export interface IntervalMapping {
  [timestamp: number]: {
    [key in ActivityDataKey]: number;
  };
}

export type ActivityDataStateType = {
  keyPresses: KeyPress[]
  leftClicks: LeftClick[]
  rightClicks: RightClick[]
  mouseMovements: MouseMovement[]
}

export type ActivityTypeKey = 'keyPresses' | 'leftClicks' | 'rightClicks' | 'mouseMovements'
