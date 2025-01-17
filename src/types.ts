import React from 'react';

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

// eslint-disable-next-line no-unused-vars
export type Setter<T> = React.Dispatch<React.SetStateAction<T>> | ((value: T) => void);

export enum NavigationAction {
  // eslint-disable-next-line no-unused-vars
  Previous = -1,

  // eslint-disable-next-line no-unused-vars
  Next = 1
}

export type DefinedRange = {
  startDate: Date;
  endDate: Date;
  label: string;
};

export interface Labels {
  today: string;
  yesterday: string;
  thisWeek: string;
  lastWeek: string;
  lastThirtyDays: string;
  thisMonth: string;
  lastMonth: string;
  thisYear: string;
  lastYear: string;
}

export interface MenuLabels {
  startDateLabel: string;
  endDateLabel: string;
}

export interface MenuButton {
  text: string;
  onClick: () => void;
}
