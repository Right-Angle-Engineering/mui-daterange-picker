'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var dateFns = require('date-fns');
var ArrowRightAlt = require('@mui/icons-material/ArrowRightAlt');
var ChevronLeft = require('@mui/icons-material/ChevronLeft');
var ChevronRight = require('@mui/icons-material/ChevronRight');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var ArrowRightAlt__default = /*#__PURE__*/_interopDefaultLegacy(ArrowRightAlt);
var ChevronLeft__default = /*#__PURE__*/_interopDefaultLegacy(ChevronLeft);
var ChevronRight__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRight);

const chunks = (array, size) => (Array.from({ length: Math.ceil(array.length / size) }, (_v, i) => array.slice(i * size, i * size + size)));
// Date
const getDaysInMonth = (date, locale) => {
    const startWeek = dateFns.startOfWeek(dateFns.startOfMonth(date), { locale });
    const endWeek = dateFns.endOfWeek(dateFns.endOfMonth(date), { locale });
    const days = [];
    for (let curr = startWeek; dateFns.isBefore(curr, endWeek);) {
        days.push(curr);
        curr = dateFns.addDays(curr, 1);
    }
    return days;
};
const isStartOfRange = ({ startDate }, day) => (startDate && dateFns.isSameDay(day, startDate));
const isEndOfRange = ({ endDate }, day) => (endDate && dateFns.isSameDay(day, endDate));
const inDateRange = ({ startDate, endDate }, day) => (startDate
    && endDate
    && (dateFns.isWithinInterval(day, { start: startDate, end: endDate })
        || dateFns.isSameDay(day, startDate)
        || dateFns.isSameDay(day, endDate)));
const isRangeSameDay = ({ startDate, endDate }) => {
    if (startDate && endDate) {
        return dateFns.isSameDay(startDate, endDate);
    }
    return false;
};
const parseOptionalDate = (date, defaultValue) => {
    if (date) {
        const parsed = date instanceof Date ? date : dateFns.parseISO(date);
        if (dateFns.isValid(parsed))
            return parsed;
    }
    return defaultValue;
};
const getValidatedMonths = (range, minDate, maxDate) => {
    const { startDate, endDate } = range;
    if (startDate && endDate) {
        const newStart = dateFns.max([startDate, minDate]);
        const newEnd = dateFns.min([endDate, maxDate]);
        return [newStart, dateFns.isSameMonth(newStart, newEnd) ? dateFns.addMonths(newStart, 1) : newEnd];
    }
    return [startDate, endDate];
};

const getDefaultRanges = (date, locale, labels) => [
    {
        label: (labels === null || labels === void 0 ? void 0 : labels.today) || 'Today',
        startDate: dateFns.startOfDay(date),
        endDate: date,
    },
    {
        label: (labels === null || labels === void 0 ? void 0 : labels.yesterday) || 'Yesterday',
        startDate: dateFns.startOfDay(dateFns.addDays(date, -1)),
        endDate: dateFns.addDays(date, -1),
    },
    {
        label: (labels === null || labels === void 0 ? void 0 : labels.thisWeek) || 'This Week',
        startDate: dateFns.startOfWeek(date, { locale }),
        endDate: dateFns.endOfWeek(date, { locale }),
    },
    {
        label: (labels === null || labels === void 0 ? void 0 : labels.lastWeek) || 'Last Week',
        startDate: dateFns.startOfWeek(dateFns.addWeeks(date, -1), { locale }),
        endDate: dateFns.endOfWeek(dateFns.addWeeks(date, -1), { locale }),
    },
    {
        label: (labels === null || labels === void 0 ? void 0 : labels.lastThirtyDays) || 'Last 30 Days',
        startDate: dateFns.addDays(date, -30),
        endDate: date,
    },
    {
        label: (labels === null || labels === void 0 ? void 0 : labels.thisMonth) || 'This Month',
        startDate: dateFns.startOfMonth(date),
        endDate: dateFns.endOfMonth(date),
    },
    {
        label: (labels === null || labels === void 0 ? void 0 : labels.lastMonth) || 'Last Month',
        startDate: dateFns.startOfMonth(dateFns.addMonths(date, -1)),
        endDate: dateFns.endOfMonth(dateFns.addMonths(date, -1)),
    },
    {
        label: (labels === null || labels === void 0 ? void 0 : labels.thisYear) || 'This Year',
        startDate: dateFns.startOfYear(date),
        endDate: dateFns.endOfYear(date),
    },
    {
        label: (labels === null || labels === void 0 ? void 0 : labels.lastYear) || 'Last Year',
        startDate: dateFns.startOfYear(dateFns.addYears(date, -1)),
        endDate: dateFns.endOfYear(dateFns.addYears(date, -1)),
    },
];

const generateYears = (relativeTo, count) => {
    const half = Math.floor(count / 2);
    return Array(count)
        .fill(0)
        .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};
const Header = ({ date, setDate, nextDisabled, prevDisabled, onClickNext, onClickPrevious, locale }) => {
    const MONTHS = typeof locale !== 'undefined'
        ? [...Array(12).keys()].map(d => { var _a; return (_a = locale.localize) === null || _a === void 0 ? void 0 : _a.month(d, { width: 'abbreviated', context: 'standalone' }); })
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const handleMonthChange = (event) => {
        setDate(dateFns.setMonth(date, parseInt(event.target.value, 10)));
    };
    const handleYearChange = (event) => {
        setDate(dateFns.setYear(date, parseInt(event.target.value, 10)));
    };
    return (React__default["default"].createElement(material.Grid, { container: true, sx: {
            justifyContent: "space-between",
            alignItems: "center"
        } },
        React__default["default"].createElement(material.Grid, { item: true, sx: { padding: '5px' } },
            React__default["default"].createElement(material.IconButton, { sx: {
                    padding: '10px',
                    '&:hover': {
                        background: 'none',
                    },
                }, disabled: prevDisabled, onClick: onClickPrevious },
                React__default["default"].createElement(ChevronLeft__default["default"], { color: prevDisabled ? 'disabled' : 'action' }))),
        React__default["default"].createElement(material.Grid, { item: true },
            React__default["default"].createElement(material.FormControl, { variant: "standard" },
                React__default["default"].createElement(material.Select, { value: dateFns.getMonth(date), onChange: handleMonthChange, MenuProps: { disablePortal: true } }, MONTHS.map((month, idx) => (React__default["default"].createElement(material.MenuItem, { key: month, value: idx }, month)))))),
        React__default["default"].createElement(material.Grid, { item: true },
            React__default["default"].createElement(material.FormControl, { variant: "standard" },
                React__default["default"].createElement(material.Select, { value: dateFns.getYear(date), onChange: handleYearChange, MenuProps: { disablePortal: true } }, generateYears(date, 30).map((year) => (React__default["default"].createElement(material.MenuItem, { key: year, value: year }, year)))))),
        React__default["default"].createElement(material.Grid, { item: true, sx: { padding: '5px' } },
            React__default["default"].createElement(material.IconButton, { sx: {
                    padding: '10px',
                    '&:hover': {
                        background: 'none',
                    },
                }, disabled: nextDisabled, onClick: onClickNext },
                React__default["default"].createElement(ChevronRight__default["default"], { color: nextDisabled ? 'disabled' : 'action' })))));
};

const Day = ({ startOfRange, endOfRange, disabled, highlighted, outlined, filled, onClick, onHover, value, }) => {
    return (React__default["default"].createElement(material.Box, { sx: [{
                display: 'flex',
                backgroundColor: (theme) => !disabled && highlighted ? theme.palette.primary.light : undefined
            }, startOfRange ? {
                borderRadius: '50% 0 0 50%'
            } : {
                borderRadius: endOfRange ? '0 50% 50% 0' : undefined
            }] },
        React__default["default"].createElement(material.IconButton, { sx: [{
                    height: '36px',
                    width: '36px',
                    padding: 0,
                    border: (theme) => !disabled && outlined ? `1px solid ${theme.palette.primary.dark}` : undefined
                }, (!disabled && filled ? {
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                    backgroundColor: (theme) => theme.palette.primary.dark,
                } : {})], disabled: disabled, onClick: onClick, onMouseOver: onHover },
            React__default["default"].createElement(material.Typography, { sx: {
                    lineHeight: 1.6,
                    color: (theme) => !disabled
                        ? (filled ? theme.palette.primary.contrastText : theme.palette.text.primary)
                        : theme.palette.text.secondary,
                }, variant: "body2" }, value))));
};

var NavigationAction;
(function (NavigationAction) {
    // eslint-disable-next-line no-unused-vars
    NavigationAction[NavigationAction["Previous"] = -1] = "Previous";
    // eslint-disable-next-line no-unused-vars
    NavigationAction[NavigationAction["Next"] = 1] = "Next";
})(NavigationAction || (NavigationAction = {}));

const Month = (props) => {
    var _a;
    const { helpers, handlers, value: date, dateRange, marker, setValue: setDate, minDate, maxDate, locale, bgColor } = props;
    const weekStartsOn = ((_a = locale === null || locale === void 0 ? void 0 : locale.options) === null || _a === void 0 ? void 0 : _a.weekStartsOn) || 0;
    const WEEK_DAYS = typeof locale !== 'undefined'
        ? [...Array(7).keys()].map(d => { var _a; return (_a = locale.localize) === null || _a === void 0 ? void 0 : _a.day((d + weekStartsOn) % 7, { width: 'short', context: 'standalone' }); })
        : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const [back, forward] = props.navState;
    return (React__default["default"].createElement(material.Paper, { square: true, elevation: 0, sx: { width: 290, backgroundColor: bgColor } },
        React__default["default"].createElement(material.Grid, { container: true, sx: [bgColor ? {
                    bgcolor: bgColor
                } : {
                    bgcolor: 'transparent'
                }] },
            React__default["default"].createElement(Header, { date: date, setDate: setDate, nextDisabled: !forward, prevDisabled: !back, onClickPrevious: () => handlers.onMonthNavigate(marker, NavigationAction.Previous), onClickNext: () => handlers.onMonthNavigate(marker, NavigationAction.Next), locale: locale }),
            React__default["default"].createElement(material.Grid, { item: true, container: true, direction: "row", sx: {
                    justifyContent: "space-between",
                    marginTop: "10px",
                    paddingLeft: "30px",
                    paddingRight: "30px"
                } }, WEEK_DAYS.map((day, index) => (React__default["default"].createElement(material.Typography, { color: "textSecondary", key: index, variant: "caption" }, day)))),
            React__default["default"].createElement(material.Grid, { item: true, container: true, direction: "column", sx: {
                    justifyContent: "space-between",
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    marginTop: '15px',
                    marginBottom: '20px'
                } }, chunks(getDaysInMonth(date, locale), 7).map((week, idx) => (React__default["default"].createElement(material.Grid, { key: idx, container: true, direction: "row", sx: {
                    justifyContent: "center"
                } }, week.map((day) => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted = inDateRange(dateRange, day) || helpers.inHoverRange(day);
                return (React__default["default"].createElement(Day, { key: dateFns.format(day, "dd-MM-yyyy"), filled: isStart || isEnd, outlined: dateFns.isToday(day), highlighted: highlighted && !isRangeOneDay, disabled: !dateFns.isSameMonth(date, day)
                        || !dateFns.isWithinInterval(day, { start: minDate, end: maxDate }), startOfRange: isStart && !isRangeOneDay, endOfRange: isEnd && !isRangeOneDay, onClick: () => handlers.onDayClick(day), onHover: () => handlers.onDayHover(day), value: dateFns.getDate(day) }));
            }))))))));
};

const isSameRange = (first, second) => {
    const { startDate: fStart, endDate: fEnd } = first;
    const { startDate: sStart, endDate: sEnd } = second;
    if (fStart && sStart && fEnd && sEnd) {
        return dateFns.isSameDay(fStart, sStart) && dateFns.isSameDay(fEnd, sEnd);
    }
    return false;
};
const DefinedRanges = ({ ranges, setRange, selectedRange, }) => (React__default["default"].createElement(material.List, null, ranges.map((range, idx) => (React__default["default"].createElement(material.ListItemButton, { key: idx, onClick: () => setRange(range), sx: [
        isSameRange(range, selectedRange) && {
            backgroundColor: (theme) => theme.palette.primary.dark,
            color: 'primary.contrastText',
            '&:hover': {
                color: 'inherit'
            }
        }
    ] },
    React__default["default"].createElement(material.ListItemText, { primaryTypographyProps: {
            variant: 'body2',
            sx: {
                fontWeight: isSameRange(range, selectedRange)
                    ? 'bold'
                    : 'normal',
            },
        } }, range.label))))));

const MARKERS = {
    FIRST_MONTH: Symbol('firstMonth'),
    SECOND_MONTH: Symbol('secondMonth'),
};

/* eslint-disable object-curly-newline */
const Menu = (props) => {
    const { ranges, dateRange, minDate, maxDate, firstMonth, setFirstMonth, secondMonth, setSecondMonth, setDateRange, helpers, handlers, locale, labels, button, bgColor, definedRangesMenuIsShown, buttonMargin, } = props;
    const { startDate, endDate } = dateRange;
    const canNavigateCloser = dateFns.differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
    const commonProps = {
        dateRange,
        minDate,
        maxDate,
        helpers,
        handlers,
    };
    return (React__default["default"].createElement(material.Grid, { container: true, wrap: "nowrap", sx: [{
                display: "inline-flex"
            }, bgColor ? {
                bgcolor: bgColor
            } : {
                bgcolor: 'transparent'
            }] },
        definedRangesMenuIsShown && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Grid, null,
                React__default["default"].createElement(DefinedRanges, { selectedRange: dateRange, ranges: ranges, setRange: setDateRange })),
            React__default["default"].createElement(material.Divider, { orientation: "vertical", flexItem: true }))),
        React__default["default"].createElement(material.Grid, null,
            React__default["default"].createElement(material.Grid, { container: true, sx: {
                    alignItems: "center",
                    padding: "20px 70px"
                } },
                React__default["default"].createElement(material.Grid, { item: true, sx: { flex: 1, textAlign: "center" } },
                    React__default["default"].createElement(material.Typography, { variant: "subtitle1" }, startDate ? dateFns.format(startDate, "dd MMMM yyyy", { locale }) : (labels === null || labels === void 0 ? void 0 : labels.startDateLabel) || "Start Date")),
                React__default["default"].createElement(material.Grid, { item: true, sx: { flex: 1, textAlign: "center" } },
                    React__default["default"].createElement(ArrowRightAlt__default["default"], { color: "action" })),
                React__default["default"].createElement(material.Grid, { item: true, sx: { flex: 1, textAlign: "center" } },
                    React__default["default"].createElement(material.Typography, { variant: "subtitle1" }, endDate ? dateFns.format(endDate, "dd MMMM yyyy", { locale }) : (labels === null || labels === void 0 ? void 0 : labels.endDateLabel) || "End Date"))),
            React__default["default"].createElement(material.Divider, null),
            React__default["default"].createElement(material.Grid, { container: true, direction: "column", sx: {
                    justifyContent: "center"
                } },
                React__default["default"].createElement(material.Grid, { container: true, direction: "row", sx: {
                        justifyContent: "center"
                    } },
                    React__default["default"].createElement(Month, Object.assign({}, commonProps, { value: firstMonth, setValue: setFirstMonth, navState: [true, canNavigateCloser], marker: MARKERS.FIRST_MONTH, locale: locale, bgColor: bgColor })),
                    React__default["default"].createElement(Month, Object.assign({}, commonProps, { value: secondMonth, setValue: setSecondMonth, navState: [canNavigateCloser, true], marker: MARKERS.SECOND_MONTH, locale: locale, bgColor: bgColor }))),
                button && (React__default["default"].createElement(material.Grid, { container: true, sx: {
                        justifyContent: "center"
                    } },
                    React__default["default"].createElement(material.Button, { variant: "contained", sx: [{
                                textTransform: 'none'
                            }, buttonMargin ? {
                                marginBottom: buttonMargin
                            } : {
                                marginBottom: 0
                            }], onClick: button.onClick }, button.text ? button.text : "Apply")))))));
};

const DateRangePicker = (props) => {
    const today = new Date();
    const { open, onChange, initialDateRange, minDate, maxDate, definedRanges = getDefaultRanges(new Date(), props.locale, props.labels), locale, menuLabels, menuButton, bgColor, definedRangesMenuIsShown, buttonMargin, } = props;
    const minDateValid = parseOptionalDate(minDate, dateFns.addYears(today, -10));
    const maxDateValid = parseOptionalDate(maxDate, dateFns.addYears(today, 10));
    const [initialFirstMonth, initialSecondMonth] = getValidatedMonths(initialDateRange || {}, minDateValid, maxDateValid);
    const [dateRange, setDateRange] = React__namespace.useState(Object.assign({}, initialDateRange));
    const [hoverDay, setHoverDay] = React__namespace.useState();
    const [firstMonth, setFirstMonth] = React__namespace.useState(initialFirstMonth || today);
    const [secondMonth, setSecondMonth] = React__namespace.useState(initialSecondMonth || dateFns.addMonths(firstMonth, 1));
    const { startDate, endDate } = dateRange;
    // handlers
    const setFirstMonthValidated = (date) => {
        if (dateFns.isBefore(date, secondMonth)) {
            setFirstMonth(date);
        }
    };
    const setSecondMonthValidated = (date) => {
        if (dateFns.isAfter(date, firstMonth)) {
            setSecondMonth(date);
        }
    };
    const setDateRangeValidated = (range) => {
        let { startDate: newStart, endDate: newEnd } = range;
        if (newStart && newEnd) {
            range.startDate = newStart = dateFns.max([newStart, minDateValid]);
            range.endDate = newEnd = dateFns.min([newEnd, maxDateValid]);
            setDateRange(range);
            onChange(range);
            setFirstMonth(newStart);
            setSecondMonth(dateFns.isSameMonth(newStart, newEnd) ? dateFns.addMonths(newStart, 1) : newEnd);
        }
        else {
            const emptyRange = {};
            setDateRange(emptyRange);
            onChange(emptyRange);
            setFirstMonth(today);
            setSecondMonth(dateFns.addMonths(firstMonth, 1));
        }
    };
    const onDayClick = (day) => {
        if (startDate && !endDate && !dateFns.isBefore(day, startDate)) {
            const newRange = { startDate, endDate: day };
            onChange(newRange);
            setDateRange(newRange);
        }
        else {
            setDateRange({ startDate: day, endDate: undefined });
        }
        setHoverDay(day);
    };
    const onMonthNavigate = (marker, action) => {
        if (marker === MARKERS.FIRST_MONTH) {
            const firstNew = dateFns.addMonths(firstMonth, action);
            if (dateFns.isBefore(firstNew, secondMonth))
                setFirstMonth(firstNew);
        }
        else {
            const secondNew = dateFns.addMonths(secondMonth, action);
            if (dateFns.isBefore(firstMonth, secondNew))
                setSecondMonth(secondNew);
        }
    };
    const onDayHover = (date) => {
        if (startDate && !endDate) {
            if (!hoverDay || !dateFns.isSameDay(date, hoverDay)) {
                setHoverDay(date);
            }
        }
    };
    // helpers
    const inHoverRange = (day) => (startDate
        && !endDate
        && hoverDay
        && dateFns.isAfter(hoverDay, startDate)
        && dateFns.isWithinInterval(day, { start: startDate, end: hoverDay }));
    const helpers = {
        inHoverRange,
    };
    const handlers = {
        onDayClick,
        onDayHover,
        onMonthNavigate,
    };
    return open ? (React__namespace.createElement(Menu, { dateRange: dateRange, minDate: minDateValid, maxDate: maxDateValid, ranges: definedRanges, firstMonth: firstMonth, secondMonth: secondMonth, setFirstMonth: setFirstMonthValidated, setSecondMonth: setSecondMonthValidated, setDateRange: setDateRangeValidated, helpers: helpers, handlers: handlers, locale: locale, labels: menuLabels, button: menuButton, bgColor: bgColor, definedRangesMenuIsShown: definedRangesMenuIsShown, buttonMargin: buttonMargin })) : null;
};

/* eslint-disable no-unused-vars */
const DateRangePickerWrapper = (props) => {
    const { wrapperClassName } = props;
    return (React__default["default"].createElement(material.Box, { sx: { position: 'relative' } },
        React__default["default"].createElement(material.Box, { sx: { position: 'relative', display: 'inline-block', zIndex: 1 }, className: wrapperClassName },
            React__default["default"].createElement(DateRangePicker, Object.assign({}, props)))));
};

const DateRangePickerExporter = (props) => (React__default["default"].createElement(DateRangePickerWrapper, Object.assign({}, props)));

exports.DateRangePicker = DateRangePickerExporter;
exports.DateRangePickerComponent = DateRangePicker;
//# sourceMappingURL=index.js.map
