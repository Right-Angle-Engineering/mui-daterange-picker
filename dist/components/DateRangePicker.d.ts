import * as React from 'react';
import { DateRange, DefinedRange, Labels, MenuLabels, MenuButton } from '../types';
interface DateRangePickerProps {
    open: boolean;
    initialDateRange?: DateRange;
    definedRanges?: DefinedRange[];
    minDate?: Date | string;
    maxDate?: Date | string;
    onChange: (dateRange: DateRange) => void;
    locale?: Locale;
    labels?: Labels;
    menuLabels?: MenuLabels;
    menuButton?: MenuButton;
    bgColor?: string;
    definedRangesMenuIsShown?: boolean;
    buttonMargin?: string | number;
}
declare const DateRangePicker: React.FunctionComponent<DateRangePickerProps>;
export default DateRangePicker;
