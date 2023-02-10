import React from 'react';
import { DateRange, DefinedRange, Labels, MenuButton, MenuLabels } from '../types';
export interface DateRangePickerWrapperProps {
    open: boolean;
    toggle: () => void;
    initialDateRange?: DateRange;
    definedRanges?: DefinedRange[];
    minDate?: Date | string;
    maxDate?: Date | string;
    onChange: (dateRange: DateRange) => void;
    closeOnClickOutside?: boolean;
    wrapperClassName?: string;
    locale?: Locale;
    labels?: Labels;
    menuLabels?: MenuLabels;
    menuButton?: MenuButton;
    bgColor?: string;
    definedRangesMenuIsShown?: boolean;
    buttonMargin?: string | number;
}
declare const DateRangePickerWrapper: React.FunctionComponent<DateRangePickerWrapperProps>;
export default DateRangePickerWrapper;
