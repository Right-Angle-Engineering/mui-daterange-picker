/* eslint-disable no-unused-vars */
import React from 'react';
import { Box } from '@mui/material';
import DateRangePicker from './DateRangePicker';
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

const DateRangePickerWrapper: React.FunctionComponent<DateRangePickerWrapperProps> = (
  props: DateRangePickerWrapperProps,
) => {
  const { wrapperClassName } = props;

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{ position: 'relative', display: 'inline-block', zIndex: 1 }}
        className={wrapperClassName}
      >
        <DateRangePicker {...props} />
      </Box>
    </Box>
  );
};

export default DateRangePickerWrapper;
