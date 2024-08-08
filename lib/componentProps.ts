import { ActivityDataStateType, ActivityTypeKey } from "@/lib/types";
import { TooltipProps } from 'recharts';

export interface ActivitySummaryProps {
  activityData: ActivityDataStateType;
}

export interface ActivityTypeSummaryContainerProps {
  activityType: ActivityTypeKey;
  total: number;
}

export interface ActivityChartProps {
  chartData: ActivityDataStateType;
  filterWindow: number;
  now: number;
}

export interface ChartContainerProps {
  activityData: ActivityDataStateType;
}

export interface CustomTooltipProps<ValueType extends string | number = number, NameType extends string | number = string> extends TooltipProps<ValueType, NameType> {
  active?: boolean;
  payload?: { name?: NameType; value?: ValueType }[]; // Use Recharts' Payload type
  label?: NameType; // Adjust based on your data type
}

export interface TimeframeToggleGroupProps {
  setFilterWindow: React.Dispatch<React.SetStateAction<number>>
}
