import { ActivityDataStateType, ActivityTypeKey } from "@/types";
import { TooltipProps } from 'recharts';

export interface ActivitySummaryProps {
  activityData: ActivityDataStateType;
}

export interface DataSummaryContainerProps {
  activityType: ActivityTypeKey;
  total: number;
}

export interface ActivityChartProps {
  activityData: ActivityDataStateType;
}

export interface CustomTooltipProps<ValueType extends string | number = number, NameType extends string | number = string> extends TooltipProps<ValueType, NameType> {
  active?: boolean;
  payload?: { name?: NameType; value?: ValueType }[]; // Use Recharts' Payload type
  label?: NameType; // Adjust based on your data type
}
