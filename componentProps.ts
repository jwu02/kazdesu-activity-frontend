import { KeyPress } from "./constants/key-press";
import { LeftClick } from "./constants/left-click";
import { MouseMovement } from "./constants/mouse-movement";
import { RightClick } from "./constants/right-click";

export interface ActivitySummaryProps {
  keyPresses: KeyPress[];
  leftClicks: LeftClick[];
  rightClicks: RightClick[];
  mouseMovements: MouseMovement[];
}

export interface DataSummaryContainerProps {
  label: string;
  total: number;
}

export interface ActivityChartProps {
  keyPresses: KeyPress[];
  leftClicks: LeftClick[];
  rightClicks: RightClick[];
  mouseMovements: MouseMovement[];
}

import { TooltipProps } from 'recharts';

export interface CustomTooltipProps<ValueType extends string | number = number, NameType extends string | number = string> extends TooltipProps<ValueType, NameType> {
  active?: boolean;
  payload?: { name?: NameType; value?: ValueType }[]; // Use Recharts' Payload type
  label?: NameType; // Adjust based on your data type
}
