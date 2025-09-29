"use client";
import { ArrowBack, ArrowForward, CalendarTodayOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NoCalendarData } from "../atoms";
import { CalendarPageSkeleton } from "../skeletons";

const ActivityCalendar = params => {
  const {
    t,
    moment,
    convertUTCToUserTimeZone,
    isLoading,
    activityDetail,
    calendarRequest,
    dateTimeFormate,
    serviceTimeSlots,
    handleTimeSlot,
    getNextDates,
    getPreviousDates,
    currentDateTime,
    onHandleSubmit,
    openCalendarPopup,
    cancelClick,
  } = params;
  return (
    <>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Typography variant="h6">{t("timezone")}</Typography>
        {activityDetail?.googleTimeZoneName && <Chip label={activityDetail?.googleTimeZoneName} />}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        flexWrap={{ xs: "wrap", sm: "nowrap" }}
        mb={5}
      >
        <Typography variant="h6" className="mb-0">
          {moment(convertUTCToUserTimeZone(calendarRequest?.calendarDate, activityDetail?.googleTimeZoneName))
            .locale(t("languageCode"))
            .format(dateTimeFormate.MMMMYYYY)}
        </Typography>
        <Button variant="text" onClick={openCalendarPopup}>
          <CalendarTodayOutlined fontSize="small" />
          {t("bookService.viewCalendar")}
        </Button>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Button
          variant="text"
          disabled={moment(convertUTCToUserTimeZone(currentDateTime, activityDetail?.googleTimeZoneName)).isSame(
            moment(convertUTCToUserTimeZone(calendarRequest?.calendarDate, activityDetail?.googleTimeZoneName)),
            "day"
          )}
          onClick={getPreviousDates}
        >
          <ArrowBack fontSize="small" />
          {t("bookService.movingDays", {
            number: calendarRequest?.visibleDays,
          })}
        </Button>
        <Button variant="text" onClick={getNextDates}>
          {t("bookService.movingDays", {
            number: calendarRequest?.visibleDays,
          })}
          <ArrowForward fontSize="small" />
        </Button>
      </Box>
      <TableContainer>
        <Table border="none" stickyHeader>
          <TableHead>
            <TableRow>
              {Array.from(Array(calendarRequest?.visibleDays), (e, index) => {
                return (
                  <TableCell variant="head" key={index}>
                    <Typography variant="body2" fontWeight={600} key={index} px={0.5}>
                      {moment(
                        convertUTCToUserTimeZone(calendarRequest?.calendarDate, activityDetail?.googleTimeZoneName)
                      )
                        .add(index, "days")
                        .locale(t("languageCode"))
                        .format(dateTimeFormate.dddDD)}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <CalendarPageSkeleton />
            ) : (
              <>
                {serviceTimeSlots.length > 0 ? (
                  <TableRow>
                    {Array.from(Array(calendarRequest?.visibleDays), (e, index) => {
                      return (
                        <TableCell variant="body" key={index}>
                          {serviceTimeSlots
                            .filter(x =>
                              convertUTCToUserTimeZone(
                                moment(x.startTimeWithoutBufferUTC).utc(true),
                                activityDetail?.googleTimeZoneName
                              ).isSame(
                                moment(
                                  convertUTCToUserTimeZone(
                                    calendarRequest?.calendarDate,
                                    activityDetail?.googleTimeZoneName
                                  )
                                ).add(index, "days"),
                                "day"
                              )
                            )
                            .map((slot, i) => (
                              <Button
                                key={moment(slot.startTimeWithoutBufferUTC).format("x")}
                                variant="contained"
                                color={slot.IsSelected ? "primary" : "inherit"}
                                disabled={slot.IsDisabled}
                                onClick={() => handleTimeSlot(slot)}
                                disableRipple
                              >
                                {convertUTCToUserTimeZone(
                                  moment(slot.startTimeWithoutBufferUTC).utc(true),
                                  activityDetail?.googleTimeZoneName
                                )
                                  .locale(t("languageCode"))
                                  .format(dateTimeFormate.HHmm)}
                              </Button>
                            ))}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <NoCalendarData t={t} number={activityDetail?.noOfStaffRequire} />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="right" mt={2} gap={2}>
        <Button
          variant="outlined"
          className="helpSubmitButton"
          onClick={() => cancelClick()}
          sx={{ padding: { xs: "0.5rem 1rem", sm: "0.75rem 1.5rem" }, fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={onHandleSubmit}
          variant="contained"
          sx={{ padding: { xs: "0.5rem 1rem", sm: "0.75rem 1.5rem" }, fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          {t("activityDetail.reserve")}
        </Button>
      </Box>
    </>
  );
};
export default ActivityCalendar;
