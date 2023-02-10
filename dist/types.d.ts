import React from 'react';
export interface DateRange {
    startDate?: Date;
    endDate?: Date;
}
export declare type Setter<T> = React.Dispatch<React.SetStateAction<T>> | ((value: T) => void);
export declare enum NavigationAction {
    Previous = -1,
    Next = 1
}
export declare type DefinedRange = {
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
