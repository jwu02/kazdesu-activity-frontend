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
  amount: number;
  createdAt: Date;
}

export type PcActivity = KeyPress | LeftClick | RightClick | MouseMovement

export interface IntervalMapping {
  [timestamp: number]: any;
}

export type ActivityDataStateType = {
  keyPresses: KeyPress[]
  leftClicks: LeftClick[]
  rightClicks: RightClick[]
  mouseMovements: MouseMovement[]
}

export type ActivityTypeKey = 'keyPresses' | 'leftClicks' | 'rightClicks' | 'mouseMovements'