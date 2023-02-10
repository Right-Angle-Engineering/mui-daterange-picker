import React from "react";
import { DateRange, DefinedRange, Setter, NavigationAction, MenuLabels, MenuButton } from "../types";
interface MenuProps {
    dateRange: DateRange;
    ranges: DefinedRange[];
    minDate: Date;
    maxDate: Date;
    firstMonth: Date;
    secondMonth: Date;
    setFirstMonth: Setter<Date>;
    setSecondMonth: Setter<Date>;
    setDateRange: Setter<DateRange>;
    helpers: {
        inHoverRange: (day: Date) => boolean;
    };
    handlers: {
        onDayClick: (day: Date) => void;
        onDayHover: (day: Date) => void;
        onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
    };
    locale?: Locale;
    labels?: MenuLabels;
    button?: MenuButton;
    bgColor?: string;
    definedRangesMenuIsShown?: boolean;
    buttonMargin?: string | number;
}
declare const Menu: React.FunctionComponent<MenuProps>;
export default Menu;
