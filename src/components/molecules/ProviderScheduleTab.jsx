"use client";

import { cancelReservation, getCancelReservationPopupDetails } from "@/src/api/activityView";
import { getProviderDetailsScheduled } from "@/src/api/provider";
import { selectUser, selectUserDetail } from "@/src/lib/slice/userSlice";
import { ConvertUTCToUserTimeZone, getCurrencyFormatWithLanguage } from "@/src/utils";
import palette from "@/src/utils/theme/palette";
import { ArrowBack, ArrowForward, CalendarToday, CalendarTodayOutlined } from "@mui/icons-material";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Button, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import _ from "lodash";
import moment from "moment";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useSelector } from "react-redux";
import { CommonSnackBar, ModalState, SnackState, Spinner } from "../atoms";
import { OverviewTabSkeleton } from "../skeletons";
import { ActivityModalStyle } from "../style";
import { ActivitiesListStyle } from "../templates/ProviderDetailTemplate";
import ViewMore from "./ViewMoreComponent";

const ProviderScheduleTab = props => {
  const { guid, locale, googleTimeZoneName } = props;
  const user = useSelector(selectUser);
  const [activityView, setActivityView] = useState();
  const route = useRouter();
  const getUserDetail = useSelector(selectUserDetail);
  const [snack, closeSnack, showSnackbar] = SnackState();
  const [cancelReservationModal, openCancelReservationModal, closeCancelReservationModal] = ModalState();
  const [cancelPopupResponse, setCancelPopupResponse] = useState(null);
  const t = useTranslations();
  const [activityList, setActivityList] = useState([]);
  const [date, setDate] = useState(moment.utc());
  const [isSkeleton, setIsSkeleton] = useState(true);

  useEffect(() => {
    getScheduleActivityData(moment.utc(), true);
  }, []);

  const getScheduleActivityData = async (dateUTC, nextAvailability) => {
    setIsSkeleton(true);
    const payload = {
      date: dateUTC,
      CompanyGuid: guid,
      UserDetailGuid: getUserDetail?.userDetailUnqGuid
        ? getUserDetail?.userDetailUnqGuid
        : "00000000-0000-0000-0000-000000000000",
      isNextAvailability: nextAvailability,
    };
    const response = await getProviderDetailsScheduled(payload);
    setActivityList(response?.data);
    setActivityView(response?.data?.slice(0, 7));
    if (response?.data?.length > 0) {
      if (nextAvailability) {
        setDate(response?.data[0]?.time);
      } else {
        setDate(dateUTC);
      }
    } else {
      setDate(dateUTC);
    }
    setIsSkeleton(false);
  };

  const getPreviousDate = () => {
    const previousDate = moment(date).subtract(1, "days");
    setDate(previousDate);
    getScheduleActivityData(previousDate, false);
  };

  const getNextDate = () => {
    const nextDate = moment(date).add(1, "days");
    setDate(nextDate);
    getScheduleActivityData(nextDate, false);
  };

  const openPopUp = async bookingActivityScheduleUnqGUID => {
    const cancelData = {};
    cancelData.userGuid = getUserDetail?.userUnqGuid;
    cancelData.BookingActivityScheduleGuid = bookingActivityScheduleUnqGUID;
    const currentUTCDate = new Date();
    const currentUTCDateString = currentUTCDate.toISOString();
    cancelData.currentDatetime = currentUTCDateString;
    const openCancelPopupResponse = await getCancelReservationPopupDetails(cancelData);
    setCancelPopupResponse(openCancelPopupResponse?.data);
    openCancelReservationModal();
  };

  const promiseResponse = async cancelDataRequest => {
    return new Promise(async (resolve, reject) => {
      const response = await cancelReservation(cancelDataRequest);
      resolve(response);
    });
  };

  const handleCancelReservation = async (bookingCustomerUnqGUID, userDetailUnqGuid, userUnqGuid) => {
    const cancelDataRequest = {};
    cancelDataRequest.bookingCustomerGUID = bookingCustomerUnqGUID;
    cancelDataRequest.loggedInUserGUID = userDetailUnqGuid;
    cancelDataRequest.loggedInUserEmail = user?.data?.email;

    trackPromise(
      promiseResponse(cancelDataRequest).then(response => {
        if (response?.status === "Success") {
          showSnackbar(t("activity.successCancelMessage"), "success");
          closeCancelReservationModal();
          getScheduleActivityData();
        } else {
          closeCancelReservationModal();
          showSnackbar(t("activity.failCancelMessage"), "error");
        }
      })
    );
  };

  const getActivityCount = async pageSize => {
    setActivityView(activityList?.slice(0, pageSize));
  };

  const cancellationPopUpButtons = (
    <>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          closeCancelReservationModal();
        }}
      >
        {t("activity.keepReservation")}
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="error"
        onClick={() => {
          handleCancelReservation(
            cancelPopupResponse[0].bookingCustomerUnqGUID,
            getUserDetail?.userDetailUnqGuid,
            getUserDetail?.userUnqGuid
          );
        }}
      >
        {t("activity.cancelReservation")}
      </Button>
    </>
  );

  const popUpTitle = (
    <>
      <Typography color={palette.text.primary} variant="h6">
        {t("activity.cancelPopupTitle")}
      </Typography>
    </>
  );
  const details = (
    <>
      {cancelPopupResponse && (
        <>
          <Typography
            color={palette.text.secondary}
            mb={{ xs: 2, sm: 2 }}
            variant="subtitle2"
            fontWeight={500}
            sx={{ fontSize: { xs: "1rem", sm: "1.125rem" } }}
          >
            {cancelPopupResponse[0]?.activityName}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <CalendarTodayOutlined color="secondary" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              color={palette.text.secondary}
            >
              {cancelPopupResponse[0]?.bookingStartDateTime}
              {cancelPopupResponse[0]?.googleTimeZoneName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocationOnOutlinedIcon color="secondary" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              color={palette.text.secondary}
            >
              {cancelPopupResponse[0]?.bookingLocation}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <CreditCardOutlinedIcon color="secondary" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              color={palette.text.secondary}
            >
              {cancelPopupResponse[0]?.isOnlinePayment === true &&
              cancelPopupResponse[0]?.totalBookingAmount !== "0.00" ? (
                <>
                  {cancelPopupResponse[0]?.currencyCode === null ||
                  cancelPopupResponse[0]?.currencyCode === undefined ||
                  cancelPopupResponse[0]?.currencyCode === ""
                    ? ""
                    : getCurrencyFormatWithLanguage(
                        cancelPopupResponse[0]?.currencyCode,
                        _.toNumber(cancelPopupResponse[0]?.totalBookingAmount),
                        locale
                      )}
                  {cancelPopupResponse[0]?.refundStatus === "Fully refundable"
                    ? t("activity.refundable")
                    : cancelPopupResponse[0]?.refundStatus === "Non refundable"
                      ? t("activity.nonRefundable")
                      : ""}
                </>
              ) : cancelPopupResponse[0]?.isOnlinePayment === false &&
                cancelPopupResponse[0]?.totalBookingAmount !== "0.00" ? (
                <>
                  {cancelPopupResponse[0]?.currencyCode === null ||
                  cancelPopupResponse[0]?.currencyCode === undefined ||
                  cancelPopupResponse[0]?.currencyCode === ""
                    ? ""
                    : getCurrencyFormatWithLanguage(
                        cancelPopupResponse[0]?.currencyCode,
                        _.toNumber(cancelPopupResponse[0]?.totalBookingAmount),
                        locale
                      )}
                </>
              ) : cancelPopupResponse[0]?.totalBookingAmount === "0.00" ? (
                <>{t("activity.free")}</>
              ) : null}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              color={palette.text.secondary}
            >
              {cancelPopupResponse[0].isOnlinePayment === false &&
              cancelPopupResponse[0].totalBookingAmount !== "0.00" ? (
                <>
                  {t("activity.cancellationPolicyTitle")} {cancelPopupResponse[0].companyName}
                </>
              ) : null}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              color={palette.text.secondary}
            >
              {cancelPopupResponse[0]?.isOnlinePayment === false &&
              cancelPopupResponse[0]?.totalBookingAmount !== "0.00" ? (
                <>{cancelPopupResponse[0].cancellationPolicy}</>
              ) : null}
            </Typography>
          </Box>
        </>
      )}
    </>
  );

  return (
    <>
      <Spinner />
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
        <Typography variant="h6">{t("providerDetail.schedule")}</Typography>
        <LocalizationProvider adapterLocale={t("languageCode")} dateAdapter={AdapterMoment}>
          <DatePicker
            variant="text"
            value={moment(ConvertUTCToUserTimeZone(date, googleTimeZoneName))}
            onChange={newValue => {
              setDate(newValue);
              getScheduleActivityData(newValue, false);
            }}
            disablePast={true}
            className="cm-view-calendar"
            label={t("bookService.viewCalendar")}
            components={{
              OpenPickerIcon: CalendarToday,
            }}
            renderInput={params => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
        <Button variant="text" disabled={date <= moment.now()} onClick={getPreviousDate}>
          <ArrowBack sx={{ fontSize: "2rem" }} />
        </Button>
        {moment(ConvertUTCToUserTimeZone(date, googleTimeZoneName))?.locale(t("languageCode")).format("ddd, DD MMM")}
        <Button variant="text" onClick={getNextDate}>
          <ArrowForward sx={{ fontSize: "2rem" }} />
        </Button>
      </Box>
      <ActivitiesListStyle mt={3}>
        {isSkeleton ? (
          <OverviewTabSkeleton />
        ) : activityList?.length > 0 ? (
          <>
            <Table>
              <TableBody>
                {activityView?.map((activity, index) => {
                  return (
                    <TableRow
                      key={index}
                      className={
                        activity.customerUnqGUID !== null ? "cm-reserved" : activity.isFull ? "cm-reserved" : ""
                      }
                    >
                      <TableCell>
                        <Typography variant="body1">{moment(activity.time).format("HH:mm")}</Typography>
                        <Typography variant="body1">
                          {activity.currencyCode === null ||
                          activity.currencyCode === undefined ||
                          activity.currencyCode === ""
                            ? ""
                            : getCurrencyFormatWithLanguage(activity.currencyCode, activity.price, locale)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{activity.activityName}</Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                          {activity.staffNames}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant={activity.customerUnqGUID !== null ? "contained" : "outlined"}
                          color={activity.customerUnqGUID !== null ? "error" : activity.isFull ? "inherit" : "primary"}
                          disabled={activity.customerUnqGUID === null ? (activity.isFull ? true : false) : false}
                          onClick={() => {
                            {
                              activity.customerUnqGUID !== null
                                ? openPopUp(activity.scheduleGuid)
                                : !activity.isFull && route.push(`/activity/${activity.activityGuid}`);
                            }
                          }}
                        >
                          {activity.customerUnqGUID !== null
                            ? t("showOtherStartDatesPage.cancel")
                            : activity.isFull
                              ? t("providerDetail.full")
                              : t("view")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {activityView?.length < activityList?.length ? (
              <ViewMore
                title={
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color={palette.text.secondary}
                    textAlign="center"
                    sx={{ textDecoration: "none" }}
                  >
                    {t("providerDetail.viewMore")}
                  </Typography>
                }
                defaultPageSize={7}
                pageSize={7}
                clickHandler={getActivityCount}
              />
            ) : null}
          </>
        ) : (
          <Box p={4} textAlign="center" bgcolor={palette.background.secondary}>
            <Typography variant="caption" color={palette.text.secondary} fontWeight={500}>
              {t("providerDetail.noScheduledActivities")}
            </Typography>
          </Box>
        )}
        <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
        <ActivityModalStyle
          open={cancelReservationModal}
          title={popUpTitle}
          closeModal={closeCancelReservationModal}
          popUpButtons={cancellationPopUpButtons}
          details={details}
          maxWidth="sm"
        />
      </ActivitiesListStyle>
    </>
  );
};

export default ProviderScheduleTab;
