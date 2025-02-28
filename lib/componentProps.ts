import { ActivityDataStateType, ActivityTypeKey } from "@/lib/types";
import { TooltipProps } from 'recharts';

export interface ActivitySummaryContainerProps {
  activityData: ActivityDataStateType;
}

export interface ActivitySummaryProps {
  activityType: ActivityTypeKey;
  total: number;
}

export interface ActivityChartProps {
  chartData: ActivityDataStateType;
  filterWindow: number;
  now: number;
}

export interface ActivityChartContainerProps {
  activityData: ActivityDataStateType;
}

export interface CustomTooltipProps<ValueType extends string | number = number, NameType extends string | number = string> extends TooltipProps<ValueType, NameType> {
  active?: boolean;
  payload?: { name?: NameType; value?: ValueType }[]; // Use Recharts' Payload type
  label: string;
}

export interface TimeframeToggleGroupProps {
  setFilterWindow: React.Dispatch<React.SetStateAction<number>>
}
