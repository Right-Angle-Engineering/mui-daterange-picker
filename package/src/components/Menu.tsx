/* eslint-disable object-curly-newline */
import React from "react";
import { Divider, Grid, Typography, Button } from "@mui/material";
import { differenceInCalendarMonths, format } from "date-fns";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Month from "./Month";
import DefinedRanges from "./DefinedRanges";
import { DateRange, DefinedRange, Setter, NavigationAction, MenuLabels, MenuButton } from "../types";
import { MARKERS } from "./Markers";

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
    // eslint-disable-next-line no-unused-vars
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    // eslint-disable-next-line no-unused-vars
    onDayClick: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onDayHover: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  locale?: Locale;
  labels?: MenuLabels;
  button?: MenuButton;
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    locale,
    labels,
    button,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
  };
  return (
    <Grid display="inline-flex" wrap="nowrap">
      <Grid>
        <DefinedRanges selectedRange={dateRange} ranges={ranges} setRange={setDateRange} />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid>
        <Grid container sx={{ padding: "20px 70px" }} alignItems="center">
          <Grid item sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="subtitle1">
              {startDate ? format(startDate, "dd MMMM yyyy", { locale }) : labels?.startDateLabel || "Start Date"}
            </Typography>
          </Grid>
          <Grid item sx={{ flex: 1, textAlign: "center" }}>
            <ArrowRightAlt color="action" />
          </Grid>
          <Grid item sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="subtitle1">
              {endDate ? format(endDate, "dd MMMM yyyy", { locale }) : labels?.endDateLabel || "End Date"}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container direction="column" justifyContent="center">
          <Grid container direction="row" justifyContent="center">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              locale={locale}
            />
            {/* <Divider orientation="vertical" flexItem /> */}
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              locale={locale}
            />
          </Grid>
          {button && (
            <Grid container justifyContent="center">
              <Button variant="contained" sx={{ textTransform: "none" }} onClick={button.onClick}>
                {button.text ? button.text : "Apply"}
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Menu;
