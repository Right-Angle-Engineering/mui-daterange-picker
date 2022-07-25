import {
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfYear,
  endOfYear,
  addYears,
} from 'date-fns';

// eslint-disable-next-line no-unused-vars
import { DefinedRange, Labels } from './types';

export const getDefaultRanges = (date: Date, locale?: Locale, labels?: Labels): DefinedRange[] => [
  {
    label: labels?.today || 'Today',
    startDate: date,
    endDate: date,
  },
  {
    label: labels?.yesterday || 'Yesterday',
    startDate: addDays(date, -1),
    endDate: addDays(date, -1),
  },
  {
    label: labels?.thisWeek || 'This Week',
    startDate: startOfWeek(date, { locale }),
    endDate: endOfWeek(date, { locale }),
  },
  {
    label: labels?.lastWeek || 'Last Week',
    startDate: startOfWeek(addWeeks(date, -1), { locale }),
    endDate: endOfWeek(addWeeks(date, -1), { locale }),
  },
  {
    label: labels?.lastSevenDays || 'Last 7 Days',
    startDate: addWeeks(date, -1),
    endDate: date,
  },
  {
    label: labels?.thisMonth || 'This Month',
    startDate: startOfMonth(date),
    endDate: endOfMonth(date),
  },
  {
    label: labels?.lastMonth || 'Last Month',
    startDate: startOfMonth(addMonths(date, -1)),
    endDate: endOfMonth(addMonths(date, -1)),
  },
  {
    label: labels?.thisMonth || 'This Year',
    startDate: startOfYear(date),
    endDate: endOfYear(date),
  },
  {
    label: labels?.lastYear || 'Last Year',
    startDate: startOfYear(addYears(date, -1)),
    endDate: endOfYear(addYears(date, -1)),
  },
];
