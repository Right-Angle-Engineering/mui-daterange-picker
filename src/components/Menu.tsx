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
  bgColor?: string;
  definedRangesMenuIsShown?: boolean;
  buttonMargin?: string | number;
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
    bgColor,
    definedRangesMenuIsShown,
    buttonMargin,
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
    <Grid
      container
      wrap="nowrap"
      sx={[{
        display: "inline-flex"
      }, bgColor ? {
        bgcolor: bgColor
      } : {
        bgcolor: 'transparent'
      }]}>
      {definedRangesMenuIsShown && (
        <>
          <Grid>
            <DefinedRanges selectedRange={dateRange} ranges={ranges} setRange={setDateRange} />
          </Grid>
          <Divider orientation="vertical" flexItem />
        </>
      )}
      <Grid>
        <Grid
          container
          sx={{
            alignItems: "center",
            padding: "20px 70px"
          }}>
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
        <Grid container direction="column" sx={{
          justifyContent: "center"
        }}>
          <Grid container direction="row" sx={{
            justifyContent: "center"
          }}>
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              locale={locale}
              bgColor={bgColor}
            />
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              locale={locale}
              bgColor={bgColor}
            />
          </Grid>
          {button && (
            <Grid container sx={{
              justifyContent: "center"
            }}>
              <Button
                variant="contained"
                sx={[{
                  textTransform: 'none'
                }, buttonMargin ? {
                  marginBottom: buttonMargin
                } : {
                  marginBottom: 0
                }]}
                onClick={button.onClick}
              >
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
